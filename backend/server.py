from fastapi import FastAPI, APIRouter, HTTPException, Header, Request, Depends
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
STATIC_DIR = ROOT_DIR / "static"
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
SENDER_NAME = os.environ.get('SENDER_NAME', 'Dalpin Heritage Systems')
APP_PUBLIC_URL = os.environ.get('APP_PUBLIC_URL', '').rstrip('/')
ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN')
# Internal download path -> full URL resolved at runtime
CHECKLIST_PATH = STATIC_DIR / "checklist-nis2.pdf"
# Honour explicit override if set, else use self-hosted endpoint
PDF_DOWNLOAD_URL = (os.environ.get('PDF_DOWNLOAD_URL') or '').strip() or \
    (f"{APP_PUBLIC_URL}/api/download/checklist" if APP_PUBLIC_URL else "/api/download/checklist")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="Dalpin Heritage NIS2 API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Admin auth dependency ----------
def require_admin(x_admin_token: Optional[str] = Header(default=None, alias="X-Admin-Token")):
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=500, detail="ADMIN_TOKEN not configured on server")
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=403, detail="Invalid or missing admin token")
    return True


# ---------- Models ----------
class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    role: str = Field(..., min_length=2, max_length=120)


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    role: str
    email_sent: bool = False
    email_error: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class WaitlistCreate(BaseModel):
    email: EmailStr
    company: Optional[str] = None


class Waitlist(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    company: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class RiskAssessmentCreate(BaseModel):
    answers: dict
    score: int = Field(..., ge=0, le=100)
    level: str
    email: Optional[EmailStr] = None
    company: Optional[str] = None


class RiskAssessment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    answers: dict
    score: int
    level: str
    email: Optional[EmailStr] = None
    company: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Email template ----------
def build_email_html(name: str, pdf_url: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background-color:#050505;font-family:Helvetica,Arial,sans-serif;color:#ffffff;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:48px 16px;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#0c0c0c;border:1px solid rgba(191,149,63,0.25);">
              <tr>
                <td style="padding:48px 48px 16px 48px;">
                  <p style="margin:0;font-size:11px;letter-spacing:6px;text-transform:uppercase;color:#bf953f;font-weight:bold;">Dalpin Heritage Systems</p>
                  <h1 style="margin:24px 0 0 0;font-size:32px;font-weight:normal;color:#ffffff;font-family:Georgia,'Times New Roman',serif;line-height:1.2;">
                    Olá {name}, o seu <span style="color:#bf953f;">Protocolo de Defesa</span> está pronto.
                  </h1>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 48px;">
                  <p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);">
                    Acedeu à <strong style="color:#ffffff;">Checklist Executiva NIS2</strong> &mdash; um documento confidencial preparado pela equipa de auditoria da Dalpin Heritage para gestores e membros do board.
                  </p>
                  <p style="margin:0 0 32px 0;font-size:15px;line-height:1.7;color:rgba(255,255,255,0.75);">
                    Os 10 requisitos críticos que o seu CISO deve validar antes do próximo board.
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:8px 48px 32px 48px;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background-color:#bf953f;">
                        <a href="{pdf_url}" target="_blank" style="display:inline-block;padding:18px 48px;font-size:11px;font-weight:bold;letter-spacing:5px;text-transform:uppercase;color:#000000;text-decoration:none;">
                          Descarregar Checklist
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding:0 48px 48px 48px;">
                  <p style="margin:0 0 8px 0;font-size:11px;line-height:1.7;color:rgba(255,255,255,0.4);">
                    Caso o botão não funcione, copie o link:
                  </p>
                  <p style="margin:0;font-size:11px;line-height:1.5;color:#bf953f;word-break:break-all;">
                    <a href="{pdf_url}" style="color:#bf953f;">{pdf_url}</a>
                  </p>
                </td>
              </tr>
              <tr>
                <td style="border-top:1px solid rgba(255,255,255,0.08);padding:24px 48px;">
                  <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3);">
                    Dalpin Heritage Systems &middot; NIS2 Compliance &middot; Lisboa, Portugal
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    """


async def send_lead_email(name: str, recipient: str) -> tuple[bool, Optional[str]]:
    if not RESEND_API_KEY:
        return False, "RESEND_API_KEY not configured"
    params = {
        "from": f"{SENDER_NAME} <{SENDER_EMAIL}>",
        "to": [recipient],
        "subject": "A sua Checklist Executiva NIS2 — Dalpin Heritage",
        "html": build_email_html(name, PDF_DOWNLOAD_URL),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent to {recipient}: {result}")
        return True, None
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return False, str(e)


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Dalpin Heritage NIS2 API", "status": "ok"}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(name=payload.name.strip(), email=payload.email, role=payload.role.strip())
    sent, err = await send_lead_email(lead.name, lead.email)
    lead.email_sent = sent
    lead.email_error = err

    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)

    if not sent:
        # We still return the lead but signal email failure via field; FE can show fallback
        logger.warning(f"Lead {lead.email} saved but email NOT sent: {err}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(_: bool = Depends(require_admin)):
    items = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/waitlist", response_model=List[Waitlist])
async def list_waitlist(_: bool = Depends(require_admin)):
    items = await db.waitlist.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


@api_router.get("/download/checklist")
async def download_checklist(request: Request):
    if not CHECKLIST_PATH.exists():
        raise HTTPException(status_code=404, detail="Checklist unavailable")
    # Log the download (non-blocking UX — awaited but fast)
    try:
        client_host = request.client.host if request.client else None
        ua = request.headers.get('user-agent')
        referer = request.headers.get('referer')
        await db.downloads.insert_one({
            "id": str(uuid.uuid4()),
            "resource": "checklist-nis2",
            "ip": client_host,
            "user_agent": ua,
            "referer": referer,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
    except Exception as e:
        logger.warning(f"Failed to log download: {e}")
    return FileResponse(
        path=str(CHECKLIST_PATH),
        media_type="application/pdf",
        filename="Checklist-Executiva-NIS2-Dalpin-Heritage.pdf",
    )


@api_router.get("/downloads")
async def list_downloads(_: bool = Depends(require_admin)):
    items = await db.downloads.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    total = await db.downloads.count_documents({})
    return {"total": total, "items": items}


@api_router.post("/waitlist", response_model=Waitlist)
async def join_waitlist(payload: WaitlistCreate):
    entry = Waitlist(email=payload.email, company=payload.company)
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.waitlist.insert_one(doc)
    return entry


@api_router.post("/risk-assessment", response_model=RiskAssessment)
async def create_risk_assessment(payload: RiskAssessmentCreate):
    entry = RiskAssessment(
        answers=payload.answers,
        score=payload.score,
        level=payload.level,
        email=payload.email,
        company=payload.company,
    )
    doc = entry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.risk_assessments.insert_one(doc)
    return entry


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
