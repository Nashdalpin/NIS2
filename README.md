# Dalpin Heritage Systems · NIS2 Compliance Landing

Marketing site + lead capture + admin dashboard for NIS2 compliance consulting.

## Stack
- **Backend**: FastAPI · MongoDB (Motor async) · Resend · Notion API
- **Frontend**: React 19 · Tailwind · shadcn/ui · framer-motion
- **Deploy**: Backend → Render · Frontend → Vercel · Database → MongoDB Atlas

## Local development

```bash
# Backend
cd backend
cp .env.example .env  # fill in your secrets
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend
cd frontend
cp .env.example .env  # set REACT_APP_BACKEND_URL=http://localhost:8001
yarn install
yarn start
```

## Environment variables

See `backend/.env.example` and `frontend/.env.example`.

**Critical:** Generate a NEW `ADMIN_TOKEN` for production:
```bash
openssl rand -hex 32
```

## Routes

- `/` — landing page
- `/admin` — admin dashboard (requires admin token)
- `/privacidade` — privacy policy
- `/termos` — terms of service
- `/cookies` — cookies policy

## API endpoints

Public:
- `GET /api/` — health
- `POST /api/leads` — capture lead + send PDF email
- `POST /api/waitlist` — priority audit waitlist
- `POST /api/risk-assessment` — save risk calculator result
- `GET /api/download/checklist` — download PDF (logged)

Admin (require `X-Admin-Token` header):
- `GET /api/leads | /api/waitlist | /api/downloads | /api/risk-assessments`
- `DELETE /api/{collection}/{id}`
- `GET /api/admin/stats`
- `POST /api/admin/purge`

## Deploy

See `DEPLOY.md` for the step-by-step guide.
