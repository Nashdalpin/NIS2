import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const LeadCapture = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.role) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API}/leads`, form);
      setSuccess(true);
      if (res.data?.email_sent) {
        toast.success("Acesso enviado para o seu email corporativo.");
      } else {
        toast.success("Pedido registado. Receberá o documento em breve.");
      }
      setForm({ name: "", email: "", role: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        "Não foi possível registar o pedido. Tente novamente.";
      toast.error(typeof msg === "string" ? msg : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="captura" data-testid="capture-section" className="py-24 lg:py-32 px-6">
      <div className="max-w-6xl mx-auto glass-card p-10 md:p-16 lg:p-20 border-[#bf953f]/20 relative overflow-hidden">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(191,149,63,0.3) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <div className="space-y-8">
            <p className="micro-label">Recurso Confidencial</p>
            <h2 className="font-cinzel text-3xl md:text-5xl leading-[1.1] tracking-tight">
              O Guia Prático
              <br />
              para o <span className="gold-text">Board</span>.
            </h2>
            <p className="font-outfit text-white/60 text-base md:text-lg font-light leading-relaxed max-w-md">
              Receba a Checklist Executiva NIS2: os 10 requisitos que o seu
              CISO deve validar hoje mesmo. Documento entregue por email.
            </p>
            <ul className="space-y-3">
              {[
                "PDF exclusivo para gestores",
                "Versão actualizada 2026",
                "Acesso encriptado ponta-a-ponta",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-[#bf953f]"
                >
                  <span className="w-1.5 h-1.5 bg-[#bf953f] rounded-full" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {success ? (
            <div
              data-testid="capture-success"
              className="text-center space-y-6 py-12 border border-[#bf953f]/30 px-8"
            >
              <CheckCircle2
                size={48}
                className="text-[#bf953f] mx-auto"
                strokeWidth={1.2}
              />
              <h3 className="font-cinzel text-2xl">Pedido recebido.</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-sm mx-auto">
                Verifique a sua caixa de entrada (e o spam) — enviámos o link
                de download seguro da Checklist Executiva NIS2.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="text-[10px] uppercase tracking-[0.3em] text-[#bf953f] border-b border-[#bf953f]/40 pb-1"
              >
                Submeter outro pedido
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" data-testid="lead-form">
              <input
                name="name"
                type="text"
                placeholder="Nome Completo"
                required
                value={form.name}
                onChange={onChange}
                data-testid="lead-form-name"
                className="bg-white/5 border border-white/10 px-5 py-5 w-full focus:border-[#bf953f] focus:bg-white/[0.07] outline-none transition-all text-sm placeholder:text-white/30"
              />
              <input
                name="email"
                type="email"
                placeholder="Email Corporativo"
                required
                value={form.email}
                onChange={onChange}
                data-testid="lead-form-email"
                className="bg-white/5 border border-white/10 px-5 py-5 w-full focus:border-[#bf953f] focus:bg-white/[0.07] outline-none transition-all text-sm placeholder:text-white/30"
              />
              <input
                name="role"
                type="text"
                placeholder="Cargo (e.g. CEO, CISO, Board Member)"
                required
                value={form.role}
                onChange={onChange}
                data-testid="lead-form-role"
                className="bg-white/5 border border-white/10 px-5 py-5 w-full focus:border-[#bf953f] focus:bg-white/[0.07] outline-none transition-all text-sm placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="lead-form-submit"
                className="w-full gold-bg text-black font-bold py-5 uppercase tracking-[0.3em] hover:brightness-110 transition-all text-xs disabled:opacity-50 inline-flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    A processar...
                  </>
                ) : (
                  "Solicitar Acesso Seguro"
                )}
              </button>
              <p className="text-[9px] text-center text-white/30 mt-3 uppercase tracking-[0.3em]">
                Acesso processado via encriptação de ponta-a-ponta
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadCapture;
