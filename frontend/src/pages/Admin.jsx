import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Users,
  Clock,
  Download,
  Gauge,
  RefreshCw,
  Mail,
  ExternalLink,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const STORAGE_KEY = "dhs_admin_token";

const fmt = (iso) => {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString("pt-PT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const KpiCard = ({ icon: Icon, label, value, accent }) => (
  <div className="glass-card p-6 relative overflow-hidden">
    <div className="flex items-center justify-between mb-3">
      <span className="micro-label text-[9px]">{label}</span>
      <Icon size={16} className="text-[#bf953f]" strokeWidth={1.5} />
    </div>
    <div
      className="font-cinzel text-3xl md:text-4xl"
      style={{ color: accent || "#fff" }}
    >
      {value ?? "—"}
    </div>
  </div>
);

const TABS = [
  { id: "leads", label: "Leads", icon: Users },
  { id: "waitlist", label: "Waitlist", icon: Clock },
  { id: "downloads", label: "Downloads", icon: Download },
  { id: "risk", label: "Risk Scores", icon: Gauge },
];

const Table = ({ cols, rows, empty }) => (
  <div className="border border-white/10 overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-white/[0.03] border-b border-white/10">
        <tr>
          {cols.map((c) => (
            <th
              key={c}
              className="text-left font-cinzel text-[10px] tracking-[0.3em] uppercase text-[#bf953f] px-5 py-4"
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={cols.length}
              className="text-center text-white/40 text-sm py-12 italic"
            >
              {empty}
            </td>
          </tr>
        ) : (
          rows.map((r, i) => (
            <tr
              key={i}
              className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              {r.map((cell, j) => (
                <td
                  key={j}
                  className="px-5 py-4 font-outfit text-white/80 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const LoginScreen = ({ onLogin }) => {
  const [token, setToken] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await axios.get(`${API}/admin/stats`, {
        headers: { "X-Admin-Token": token },
      });
      localStorage.setItem(STORAGE_KEY, token);
      onLogin(token);
    } catch (ex) {
      setErr(
        ex?.response?.status === 403
          ? "Token inválido."
          : "Falha na validação. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] grain flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <span className="w-10 h-10 border border-[#bf953f] flex items-center justify-center">
            <span className="font-cinzel text-[11px] tracking-[0.1em] text-[#bf953f]">
              DHS
            </span>
          </span>
          <span className="font-cinzel text-xs tracking-[0.35em] text-white">
            DALPIN HERITAGE · ADMIN
          </span>
        </div>

        <div className="glass-card p-10 border-[#bf953f]/20">
          <p className="micro-label text-[9px] mb-3">Acesso Restrito</p>
          <h1 className="font-cinzel text-2xl mb-8 leading-tight">
            Autenticação <span className="gold-text">privilegiada</span>
          </h1>
          <form onSubmit={submit} className="space-y-4">
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Admin Token"
              required
              autoFocus
              data-testid="admin-token-input"
              className="bg-white/5 border border-white/10 px-5 py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
            />
            {err && (
              <p
                data-testid="admin-login-error"
                className="text-xs text-red-400 tracking-wide"
              >
                {err}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !token}
              data-testid="admin-login-submit"
              className="w-full gold-bg text-black font-bold py-4 uppercase tracking-[0.3em] text-[11px] hover:brightness-110 transition-all disabled:opacity-50"
            >
              {loading ? "A validar..." : "Entrar"}
            </button>
          </form>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] text-center mt-6">
            Tentativas registadas
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [tab, setTab] = useState("leads");
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ leads: [], waitlist: [], downloads: [], risk: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const headers = useMemo(
    () => ({ "X-Admin-Token": token }),
    [token]
  );

  const load = async (t = token) => {
    if (!t) return;
    setLoading(true);
    try {
      const [s, leads, wait, dl, risk] = await Promise.all([
        axios.get(`${API}/admin/stats`, { headers: { "X-Admin-Token": t } }),
        axios.get(`${API}/leads`, { headers: { "X-Admin-Token": t } }),
        axios.get(`${API}/waitlist`, { headers: { "X-Admin-Token": t } }),
        axios.get(`${API}/downloads`, { headers: { "X-Admin-Token": t } }),
        axios.get(`${API}/risk-assessments`, { headers: { "X-Admin-Token": t } }),
      ]);
      setStats(s.data);
      setData({
        leads: leads.data || [],
        waitlist: wait.data || [],
        downloads: dl.data?.items || [],
        risk: risk.data || [],
      });
    } catch (e) {
      if (e?.response?.status === 403) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) load(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setToken("");
  };

  if (!token) {
    return <LoginScreen onLogin={(t) => setToken(t)} />;
  }

  const renderBody = () => {
    if (tab === "leads") {
      return (
        <Table
          cols={["Data", "Nome", "Email", "Cargo", "Email enviado"]}
          empty="Ainda não há leads capturados."
          rows={data.leads.map((r) => [
            fmt(r.created_at),
            <span key="n" className="text-white">{r.name}</span>,
            <a
              key="e"
              href={`mailto:${r.email}`}
              className="text-[#bf953f] hover:underline inline-flex items-center gap-1"
            >
              <Mail size={12} /> {r.email}
            </a>,
            r.role,
            r.email_sent ? (
              <span className="text-green-400 text-[10px] uppercase tracking-widest">✓ Enviado</span>
            ) : (
              <span
                title={r.email_error || ""}
                className="text-red-400/80 text-[10px] uppercase tracking-widest"
              >
                ✕ Falhou
              </span>
            ),
          ])}
        />
      );
    }
    if (tab === "waitlist") {
      return (
        <Table
          cols={["Data", "Email", "Organização"]}
          empty="Lista de espera vazia."
          rows={data.waitlist.map((r) => [
            fmt(r.created_at),
            <a
              key="e"
              href={`mailto:${r.email}`}
              className="text-[#bf953f] hover:underline inline-flex items-center gap-1"
            >
              <Mail size={12} /> {r.email}
            </a>,
            r.company || "—",
          ])}
        />
      );
    }
    if (tab === "downloads") {
      return (
        <Table
          cols={["Data", "Recurso", "IP", "Referer"]}
          empty="Sem downloads registados."
          rows={data.downloads.map((r) => [
            fmt(r.created_at),
            <span key="r" className="text-white">{r.resource || "—"}</span>,
            r.ip || "—",
            r.referer ? (
              <a
                href={r.referer}
                target="_blank"
                rel="noreferrer"
                className="text-[#bf953f] hover:underline inline-flex items-center gap-1 max-w-[220px] truncate"
              >
                {r.referer} <ExternalLink size={12} />
              </a>
            ) : "—",
          ])}
        />
      );
    }
    // risk
    return (
      <Table
        cols={["Data", "Score", "Nível", "Sector", "Dimensão", "CISO"]}
        empty="Sem diagnósticos submetidos."
        rows={data.risk.map((r) => [
          fmt(r.created_at),
          <span key="s" className="font-cinzel text-lg gold-text">{r.score}</span>,
          <span key="l" className="text-white">{r.level}</span>,
          r.answers?.sector || "—",
          r.answers?.size || "—",
          r.answers?.ciso || "—",
        ])}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 border border-[#bf953f] flex items-center justify-center">
              <span className="font-cinzel text-[10px] tracking-[0.1em] text-[#bf953f]">
                DHS
              </span>
            </span>
            <span className="font-cinzel text-xs tracking-[0.35em] text-white">
              ADMIN · DASHBOARD
            </span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => load()}
              disabled={loading}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-[#bf953f] inline-flex items-center gap-2"
              data-testid="admin-refresh"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              Refrescar
            </button>
            <button
              onClick={() => navigate("/")}
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-[#bf953f]"
            >
              Ver Site
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout"
              className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-red-400 inline-flex items-center gap-2"
            >
              <LogOut size={12} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-10">
          <p className="micro-label mb-4">Overview</p>
          <h1 className="font-cinzel text-3xl md:text-4xl leading-tight">
            Painel de <span className="gold-text">conformidade</span>.
          </h1>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <KpiCard icon={Users} label="Total Leads" value={stats?.leads} accent="#bf953f" />
          <KpiCard icon={Clock} label="Waitlist" value={stats?.waitlist} />
          <KpiCard icon={Download} label="Downloads" value={stats?.downloads} />
          <KpiCard icon={Gauge} label="Risk Scores" value={stats?.risk_assessments} />
        </div>

        <div className="flex items-center gap-2 border-b border-white/10 mb-6 overflow-x-auto">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`admin-tab-${t.id}`}
                className={`relative px-5 py-4 text-[11px] uppercase tracking-[0.3em] inline-flex items-center gap-2 transition-colors whitespace-nowrap ${
                  active
                    ? "text-[#bf953f]"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Icon size={12} />
                {t.label}
                {active && (
                  <span className="absolute left-0 right-0 bottom-[-1px] h-px bg-[#bf953f]" />
                )}
              </button>
            );
          })}
        </div>

        {renderBody()}
      </main>
    </div>
  );
}
