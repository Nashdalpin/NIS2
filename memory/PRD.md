# Dalpin Heritage Systems — NIS2 Compliance Landing Page

## Original Problem Statement
"melhore essa landing page" — User uploaded an existing Portuguese (pt-PT) landing page HTML for "Dalpin Heritage Systems", a B2B cybersecurity consultancy focused on EU NIS2 Directive compliance (Diretiva UE 2022/2555).

## User Choices
- Full-stack redesign + functional backend lead capture
- Add all missing sections (Header, Footer, Testimonials, FAQ)
- Keep current dark + gold luxurious aesthetic (Cinzel typography)
- Form: save to DB + send confirmation email via Resend with PDF download link

## Architecture
- **Backend**: FastAPI + MongoDB (Motor) + Resend SDK (sync wrapped via asyncio.to_thread)
- **Frontend**: React 19 + Tailwind + shadcn/ui (Accordion, Sonner) + framer-motion + react-fast-marquee
- **Fonts**: Cinzel (headings) + Outfit (body) + JetBrains Mono — loaded from Google Fonts
- **Color**: #050505 (bg), #bf953f (gold accent), #ffffff (text)

## Implemented (2026-04-25)
- Backend endpoints `/api/leads` (POST + GET) and `/api/waitlist` (POST)
- Resend HTML email template with branded download CTA → PDF link
- Graceful email-failure handling (lead saved even if email send fails)
- 10 React components: Header (sticky glass + mobile drawer), Hero (radar-pulse rings + dual CTAs + KPI strip), WarningMarquee (regulatory alerts), Methodology (4 staggered numbered cards), Risks (3 themed risks), Testimonials (3 board-level quotes), FAQ (6-item shadcn accordion), LeadCapture (form → /api/leads), PriorityModal (waitlist), Footer (4-column corporate)
- All in Portuguese (pt-PT)
- 9/9 backend pytest pass; full frontend e2e verified

## Known Items / Backlog
- **P0**: User must verify domain `dalpinheritage.com` on https://resend.com/domains so transactional emails are actually delivered (currently `email_sent=false`, lead still saved)
- **P1**: Replace Google Drive `/view` link with direct download link or self-hosted PDF for cleaner UX
- **P2**: Auth-protect GET /api/leads (currently public — exposes lead emails)
- **P2**: Move email send to FastAPI BackgroundTasks (currently blocks ~500ms-2s on Resend latency)
- **P2**: Lead admin dashboard (CRUD)
- **P3**: i18n (EN version), animation library on scroll reveal, A/B test CTAs

## Test Credentials
N/A — no auth in app.
