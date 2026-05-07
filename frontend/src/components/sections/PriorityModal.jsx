import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const PriorityModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) {
      // reset transient state when modal closes
      setDone(false);
      setEmail("");
      setCompany("");
    }
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post(`${API}/waitlist`, { email, company });
      setDone(true);
      toast.success("Candidatura registada. Análise em 48h.");
    } catch {
      toast.error("Erro ao registar candidatura.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="priority-modal"
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0a0a] p-6 sm:p-10 md:p-14 max-w-2xl w-full text-center border border-[#bf953f]/30 relative overflow-hidden max-h-[92vh] overflow-y-auto"
      >
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(191,149,63,0.25) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <button
          onClick={onClose}
          aria-label="Fechar"
          data-testid="priority-modal-close"
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative z-10">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#bf953f] font-bold mb-5 md:mb-6">
            Vagas Limitadas · T2 2026
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl md:text-4xl mb-5 md:mb-6 gold-text leading-tight">
            Lista de Espera
            <br />
            Priority Audit
          </h3>
          <p className="font-outfit text-sm sm:text-base text-white/60 mb-6 md:mb-8 leading-relaxed max-w-md mx-auto">
            Devido ao elevado rigor técnico do nosso{" "}
            <span className="text-white">Readiness Assessment</span>, aceitamos
            apenas <strong className="text-white">3 organizações por mês</strong>{" "}
            para acompanhamento completo.
          </p>

          {done ? (
            <div data-testid="priority-success" className="space-y-4 max-w-sm mx-auto">
              <div className="border border-[#bf953f]/40 p-6">
                <p className="font-cinzel text-lg gold-text">
                  Candidatura recebida.
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-3">
                  A nossa equipa avalia em 48h
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto">
              <div className="flex items-center gap-3 bg-white/5 px-4 py-3 border border-white/10 mb-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/70">
                  Vagas restantes este mês: 01
                </span>
              </div>
              <input
                type="email"
                placeholder="Email Corporativo"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="priority-email"
                className="bg-white/5 border border-white/10 px-4 py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
              />
              <input
                type="text"
                placeholder="Organização"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                data-testid="priority-company"
                className="bg-white/5 border border-white/10 px-4 py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="priority-submit"
                className="w-full gold-bg text-black font-bold py-4 uppercase tracking-[0.3em] text-[10px] hover:brightness-110 transition-all disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  "Candidatar Organização"
                )}
              </button>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] pt-2">
                Análise em 48h
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriorityModal;
