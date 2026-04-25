"""Backend API tests for Dalpin Heritage NIS2 API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://landing-polish-12.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
def test_root_status(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert data.get("status") == "ok"
    assert "service" in data


# ---------- Leads ----------
class TestLeads:
    def test_create_lead_success_persists(self, session):
        payload = {"name": "TEST_QA Tester", "email": "delivered@resend.dev", "role": "CISO"}
        r = session.post(f"{API}/leads", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        # No mongo _id
        assert "_id" not in data
        # Required fields
        assert data["name"] == "TEST_QA Tester"
        assert data["email"] == "delivered@resend.dev"
        assert data["role"] == "CISO"
        assert isinstance(data["id"], str) and len(data["id"]) > 10
        assert "email_sent" in data
        assert "email_error" in data
        assert "created_at" in data
        # Domain unverified -> email_sent likely False but lead must persist
        # Verify persistence via GET
        list_r = session.get(f"{API}/leads")
        assert list_r.status_code == 200
        leads = list_r.json()
        assert any(l["id"] == data["id"] for l in leads)

    def test_create_lead_missing_fields(self, session):
        r = session.post(f"{API}/leads", json={"email": "a@b.com"})
        assert r.status_code == 422

    def test_create_lead_invalid_email(self, session):
        r = session.post(f"{API}/leads", json={"name": "TEST_X", "email": "not-an-email", "role": "CTO"})
        assert r.status_code == 422

    def test_list_leads_no_objectid_and_sorted(self, session):
        r = session.get(f"{API}/leads")
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        for l in leads:
            assert "_id" not in l
            assert "id" in l and "email" in l and "created_at" in l
        # sorted desc by created_at
        timestamps = [l["created_at"] for l in leads]
        assert timestamps == sorted(timestamps, reverse=True)


# ---------- Waitlist ----------
class TestWaitlist:
    def test_create_waitlist_success(self, session):
        payload = {"email": "TEST_waitlist@resend.dev", "company": "TEST_Acme Corp"}
        r = session.post(f"{API}/waitlist", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "_id" not in data
        assert data["email"] == "TEST_waitlist@resend.dev"
        assert data["company"] == "TEST_Acme Corp"
        assert isinstance(data["id"], str)
        assert "created_at" in data

    def test_create_waitlist_no_company(self, session):
        r = session.post(f"{API}/waitlist", json={"email": "TEST_solo@resend.dev"})
        assert r.status_code == 200
        data = r.json()
        assert data["email"] == "TEST_solo@resend.dev"
        assert data.get("company") is None

    def test_create_waitlist_invalid_email(self, session):
        r = session.post(f"{API}/waitlist", json={"email": "not-email"})
        assert r.status_code == 422

    def test_create_waitlist_missing_email(self, session):
        r = session.post(f"{API}/waitlist", json={})
        assert r.status_code == 422
