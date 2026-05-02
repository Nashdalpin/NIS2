"""Notion API integration — push captured leads to a Notion database.

Minimal, async, and non-blocking. Uses httpx and runs via FastAPI
BackgroundTasks so the lead capture response is not delayed.
"""
import os
import logging
from pathlib import Path
from typing import Optional, Dict, Any
import httpx
from dotenv import load_dotenv

# Ensure env is loaded even if this module is imported before server.py finishes
load_dotenv(Path(__file__).parent / ".env")

logger = logging.getLogger(__name__)

NOTION_API_KEY = os.environ.get("NOTION_API_KEY")
NOTION_DATABASE_ID = os.environ.get("NOTION_DATABASE_ID")
NOTION_VERSION = os.environ.get("NOTION_VERSION", "2022-06-28")
NOTION_BASE = "https://api.notion.com/v1"


def _headers() -> Dict[str, str]:
    return {
        "Authorization": f"Bearer {NOTION_API_KEY}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def _lead_to_properties(
    name: str,
    email: str,
    role: str,
    email_sent: bool,
    score: Optional[int] = None,
    created_at_iso: Optional[str] = None,
) -> Dict[str, Any]:
    """Map a Lead to Notion database properties.

    Matches the actual "PDF Leads" schema:
      - Nome (Title)
      - Email (Email)
      - Cargo (Rich text)
      - Data (Date)
      - Email Enviado (Checkbox)
      - Score NIS2 (Number, optional)
    """
    props: Dict[str, Any] = {
        "Nome": {"title": [{"text": {"content": (name or "")[:200]}}]},
        "Email": {"email": email},
        "Cargo": {"rich_text": [{"text": {"content": (role or "")[:200]}}]},
        "Email Enviado": {"checkbox": bool(email_sent)},
    }
    if created_at_iso:
        props["Data"] = {"date": {"start": created_at_iso}}
    if score is not None:
        props["Score NIS2"] = {"number": int(score)}
    return props


async def push_lead_to_notion(
    name: str,
    email: str,
    role: str,
    email_sent: bool,
    score: Optional[int] = None,
    created_at_iso: Optional[str] = None,
) -> Dict[str, Any]:
    """Create a page in the configured Notion database.

    Returns a dict with keys:
      - ok: bool
      - page_id: Optional[str]
      - error: Optional[str]
    """
    if not NOTION_API_KEY or not NOTION_DATABASE_ID:
        return {"ok": False, "page_id": None, "error": "Notion not configured"}

    payload = {
        "parent": {"database_id": NOTION_DATABASE_ID},
        "properties": _lead_to_properties(name, email, role, email_sent, score, created_at_iso),
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            resp = await client.post(
                f"{NOTION_BASE}/pages", headers=_headers(), json=payload
            )
        if resp.status_code in (200, 201):
            data = resp.json()
            return {"ok": True, "page_id": data.get("id"), "error": None}
        logger.error("Notion create failed: %s %s", resp.status_code, resp.text[:500])
        return {
            "ok": False,
            "page_id": None,
            "error": f"{resp.status_code}: {resp.text[:300]}",
        }
    except Exception as e:  # pragma: no cover
        logger.exception("Notion push raised an exception")
        return {"ok": False, "page_id": None, "error": str(e)}


async def sync_lead_background(
    lead_id: str,
    name: str,
    email: str,
    role: str,
    email_sent: bool,
    db,
    created_at_iso: Optional[str] = None,
) -> None:
    """Background task: push lead to Notion and patch the Mongo document."""
    result = await push_lead_to_notion(name, email, role, email_sent, created_at_iso=created_at_iso)
    await db.leads.update_one(
        {"id": lead_id},
        {
            "$set": {
                "notion_page_id": result["page_id"],
                "notion_sync_status": "synced" if result["ok"] else "failed",
                "notion_sync_error": result["error"],
            }
        },
    )
    logger.info(
        "Notion sync for %s => ok=%s page_id=%s",
        email,
        result["ok"],
        result["page_id"],
    )
