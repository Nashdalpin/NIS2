import { useState, useMemo } from "react";
import axios from "axios";
import { ArrowRight, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/**
 * Each question:
 *  - id, label, options [{ value, label, score (0..max) }]
 *  - max: maximum score contribution for normalisation
 */
const QUESTIONS = [
  {
    id: "sector",
    label: "Em que sector opera a sua organização?",
    hint: "A NIS2 distingue entidades essenciais de importantes.",
    max: 20,
    options: [
      { value: "energia", label: "Energia, Banca ou Saúde", score: 20 },
      { value: "transportes", label: "Transportes, Água ou Infraestrutura digital", score: 18 },
      { value: "manufatura", label: "Manufatura, Alimentação ou Resíduos", score: 12 },
      { value: "outro", label: "Outro / Não tenho a certeza", score: 8 },
    ],
  },
  {
    id: "size",
    label: "Qual a dimensão da empresa?",
    hint: "Acima de 50 colaboradores ou 10M€ de faturação tipicamente entram no perímetro.",
    max: 15,
    options: [
      { value: ">250", label: "Mais de 250 colaboradores", score: 15 },
      { value: "50-250", label: "Entre 50 e 250 colaboradores", score: 12 },
      { value: "<50", label: "Menos de 50 colaboradores", score: 5 },
    ],
  },
  {
    id: "ciso",
    label: "Tem um responsável formal de cibersegurança (CISO/DPO)?",
    hint: "A NIS2 exige governance documentada e responsável identificável.",
    max: 15,
    options: [
      { value: "no", label: "Não", score: 15 },
      { value: "partial", label: "Parcial / partilhado com TI", score: 10 },
      { value: "yes", label: "Sim, dedicado", score: 2 },
    ],
  },
  {
    id: "detection",
    label: "Tempo médio de detecção de um incidente?",
    hint: "A regra de ouro são 24h para reporte ao CNCS.",
    max: 15,
    options: [
      { value: "<24", label: "Menos de 24 horas", score: 2 },
      { value: "24-72", label: "Entre 24 e 72 horas", score: 8 },
      { value: ">72", label: "Mais de 72 horas", score: 13 },
      { value: "unknown", label: "Não sabemos", score: 15 },
    ],
  },
  {
    id: "audit",
    label: "Auditoria de cibersegurança nos últimos 12 meses?",
    hint: "A última auditoria formal indica maturidade do programa.",
    max: 15,
    options: [
      { value: "external", label: "Sim, auditoria externa formal", score: 2 },
      { value: "internal", label: "Sim, apenas auditoria interna", score: 8 },
      { value: "none", label: "Não", score: 15 },
    ],
  },
  {
    id: "irp",
    label: "Plano de Resposta a Incidentes (IRP) documentado?",
    hint: "Sem IRP testado, o reporte em 24h é praticamente impossível.",
    max: 10,
    options: [
      { value: "tested", label: "Sim, testado em simulacro nos últimos 12m", score: 1 },
      { value: "doc", label: "Documentado mas nunca testado", score: 6 },
      { value: "none", label: "Não temos IRP", score: 10 },
    ],
  },
  {
    id: "supply",
    label: "Avalia a cibersegurança dos seus fornecedores críticos?",
    hint: "A cadeia de fornecedores é responsabilidade direta do board NIS2.",
    max: 10,
    options: [
      { value: "contract", label: "Sim, com cláusulas SLA e auditoria", score: 1 },
      { value: "informal", label: "Apenas informalmente", score: 6 },
      { value: "no", label: "Não", score: 10 },
    ],
  },
];

const TOTAL_MAX = QUESTIONS.reduce((s, q) => s + q.max, 0);

const computeLevel = (score) => {
  if (score >= 75) return { key: "critico", label: "Crítico", color: "#e23b3b" };
  if (score >= 55) return { key: "alto", label: "Alto", color: "#bf953f" };
  if (score >= 30) return { key: "moderado", label: "Moderado", color: "#d4a857" };
  return { key: "baixo", label: "Baixo", color: "#3aa372" };
};

const DIAGNOSIS = {
  critico:
    "Exposição crítica. Recomendamos auditoria urgente e activação imediata de readiness assessment.",
  alto:
    "Exposição alta. Lacunas significativas no perímetro NIS2 — está vulnerável a coimas e responsabilidade pessoal.",
  moderado:
    "Maturidade média. O caminho está iniciado, mas faltam controlos formais para conformidade incontestável.",
  baixo:
    "Bom posicionamento. Recomendamos validação independente para certificar e proteger juridicamente o board.",
};

const lightenHex = (hex) => {
  const c = hex.replace("#", "");
  const n = parseInt(c, 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + 60);
  const g = Math.min(255, ((n >> 8) & 0xff) + 60);
  const b = Math.min(255, (n & 0xff) + 60);
  return `rgb(${r}, ${g}, ${b})`;
};

const Gauge = ({ score, color }) => {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const lighter = lightenHex(color);
  const gradId = `gauge-grad-${color.replace("#", "")}`;
  return (
    <div className="relative w-56 h-56 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="50%" stopColor={lighter} />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id={`${gradId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          filter={`url(#${gradId}-glow)`}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="font-cinzel text-6xl leading-none tabular-nums"
          style={{
            background: `linear-gradient(135deg, ${lighter} 0%, ${color} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          data-testid="risk-score-value"
        >
          {score}
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40 mt-2">
          / 100
        </div>
      </div>
    </div>
  );
};

export const RiskCalculator = ({ onRequestReport, onPriorityClick }) => {
  const [step, setStep] = useState(-1); // -1 = intro, 0..N-1 = questions, N = email gate, N+1 = result
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [gate, setGate] = useState({ name: "", email: "", company: "" });
  const [persisting, setPersisting] = useState(false);
  const EMAIL_GATE_STEP = QUESTIONS.length;
  const RESULT_STEP = QUESTIONS.length + 1;

  const score = useMemo(() => {
    const raw = QUESTIONS.reduce((sum, q) => {
      const a = answers[q.id];
      const opt = q.options.find((o) => o.value === a);
      return sum + (opt ? opt.score : 0);
    }, 0);
    return Math.round((raw / TOTAL_MAX) * 100);
  }, [answers]);

  const level = computeLevel(score);
  const isResult = step === RESULT_STEP;
  const isGate = step === EMAIL_GATE_STEP;

  const persist = async (finalScore, finalLevel, contact) => {
    if (submitted) return;
    setPersisting(true);
    try {
      await axios.post(`${API}/risk-assessment`, {
        answers: { ...answers, _name: contact?.name || null },
        score: finalScore,
        level: finalLevel,
        email: contact?.email || null,
        company: contact?.company || null,
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setPersisting(false);
    }
  };

  const select = (qId, val) => {
    setAnswers((p) => ({ ...p, [qId]: val }));
    // auto-advance, on last question go to email gate (not result)
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, EMAIL_GATE_STEP));
    }, 220);
  };

  const submitGate = async (e) => {
    e.preventDefault();
    if (!gate.email) return;
    await persist(score, level.label, gate);
    setStep(RESULT_STEP);
  };

  const skipGate = async () => {
    await persist(score, level.label, null);
    setStep(RESULT_STEP);
  };

  const reset = () => {
    setStep(-1);
    setAnswers({});
    setSubmitted(false);
    setGate({ name: "", email: "", company: "" });
  };

  const progress =
    step < 0 ? 0 : step >= RESULT_STEP ? 100 : (step / RESULT_STEP) * 100;
  const current = step >= 0 && step < QUESTIONS.length ? QUESTIONS[step] : null;

  return (
    <section
      id="calculadora"
      data-testid="risk-calculator-section"
      className="py-16 md:py-24 lg:py-32 px-5 sm:px-6 relative overflow-hidden isolate"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] -z-10 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(191,149,63,0.08) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="micro-label mb-5 md:mb-6 inline-flex items-center gap-3">
            <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">III</span>
            <span className="w-6 h-px bg-[#bf953f]/40" />
            <span>Diagnóstico em 60 Segundos</span>
            <span className="w-6 h-px bg-[#bf953f]/40" />
            <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">III</span>
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
            Calculadora de <span className="gold-text">Exposição NIS2</span>.
          </h2>
          <p className="font-outfit text-white/55 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-5 md:mt-6">
            Sete perguntas. Resultado imediato. Confidencial.
          </p>
        </div>

        <div className="glass-card border-[#bf953f]/20 p-6 sm:p-8 md:p-14 lg:p-16 relative">
          {/* Progress bar */}
          {step >= 0 && (
            <div className="mb-7 md:mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#bf953f]">
                  {isResult
                    ? "Diagnóstico Concluído"
                    : `Pergunta ${step + 1} de ${QUESTIONS.length}`}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 tabular-nums">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-px bg-white/10 relative overflow-hidden">
                <div
                  className="h-full transition-all duration-700 ease-out"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, #8a6a2a, #bf953f 50%, #f3d27a)",
                    boxShadow: "0 0 8px rgba(191,149,63,0.6)",
                  }}
                />
              </div>
            </div>
          )}

          {/* INTRO */}
          {step === -1 && (
            <div className="text-center space-y-6 md:space-y-8 py-4 md:py-8">
              <ShieldAlert
                size={42}
                strokeWidth={1.2}
                className="text-[#bf953f] mx-auto"
              />
              <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl">
                Quão exposto está o seu board?
              </h3>
              <p className="font-outfit text-white/55 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Avaliamos sete dimensões críticas: sector, dimensão, governance,
                detecção, auditoria, IRP e cadeia de fornecedores.
                Sem registo. Sem email. Apenas o seu score.
              </p>
              <button
                onClick={() => setStep(0)}
                data-testid="risk-start-btn"
                className="gold-btn bg-[#bf953f] text-black font-bold py-4 sm:py-5 px-8 sm:px-12 uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[11px] hover:bg-white transition-all inline-flex items-center gap-3"
              >
                <span>Começar Diagnóstico</span>
                <ArrowRight size={14} className="relative z-[2]" />
              </button>
            </div>
          )}

          {/* QUESTION */}
          {current && (
            <div data-testid={`risk-question-${step}`} className="space-y-6 md:space-y-8">
              <div className="space-y-3">
                <p className="micro-label text-[9px]">
                  {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
                </p>
                <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl leading-tight">
                  {current.label}
                </h3>
                <p className="text-white/45 text-xs sm:text-sm">{current.hint}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {current.options.map((opt) => {
                  const active = answers[current.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => select(current.id, opt.value)}
                      data-testid={`risk-option-${current.id}-${opt.value}`}
                      className={`text-left px-5 py-4 sm:px-6 sm:py-5 border transition-all duration-300 group ${
                        active
                          ? "border-[#bf953f] bg-[#bf953f]/10"
                          : "border-white/10 hover:border-[#bf953f]/60 hover:bg-white/5"
                      }`}
                    >
                      <span className="block text-sm text-white">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between pt-3 md:pt-4 gap-3">
                <button
                  onClick={() => setStep((s) => Math.max(-1, s - 1))}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#bf953f] inline-flex items-center gap-2 shrink-0"
                >
                  <ArrowLeft size={12} />
                  Anterior
                </button>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 text-right">
                  <span className="hidden sm:inline">As respostas avançam automaticamente</span>
                  <span className="sm:hidden">Avança automaticamente</span>
                </span>
              </div>
            </div>
          )}

          {/* EMAIL GATE — captures lead before showing score */}
          {isGate && (
            <div data-testid="risk-gate" className="space-y-6 md:space-y-8 py-2">
              <div className="text-center space-y-3">
                <p className="micro-label text-[9px]">Última Etapa</p>
                <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl leading-tight">
                  O seu diagnóstico está <span className="gold-text">pronto</span>.
                </h3>
                <p className="font-outfit text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                  Receba o relatório completo por email com o score, nível
                  de risco e recomendações personalizadas para o seu sector.
                </p>
              </div>
              <form
                onSubmit={submitGate}
                className="space-y-3 max-w-md mx-auto"
              >
                <input
                  type="text"
                  placeholder="Nome"
                  value={gate.name}
                  onChange={(e) => setGate({ ...gate, name: e.target.value })}
                  data-testid="risk-gate-name"
                  className="bg-white/5 border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Corporativo"
                  value={gate.email}
                  onChange={(e) => setGate({ ...gate, email: e.target.value })}
                  data-testid="risk-gate-email"
                  className="bg-white/5 border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
                />
                <input
                  type="text"
                  placeholder="Organização (opcional)"
                  value={gate.company}
                  onChange={(e) => setGate({ ...gate, company: e.target.value })}
                  data-testid="risk-gate-company"
                  className="bg-white/5 border border-white/10 px-4 py-3.5 sm:px-5 sm:py-4 w-full focus:border-[#bf953f] outline-none text-sm placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={persisting || !gate.email}
                  data-testid="risk-gate-submit"
                  className="gold-btn w-full gold-bg text-black font-bold py-4 uppercase tracking-[0.3em] text-[11px] hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {persisting ? "A processar..." : "Ver Diagnóstico"}
                </button>
                <button
                  type="button"
                  onClick={skipGate}
                  className="w-full text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#bf953f] py-2"
                >
                  Saltar e ver score (sem relatório)
                </button>
              </form>
              <p className="text-[9px] text-center text-white/30 uppercase tracking-[0.3em]">
                Os seus dados nunca são partilhados · RGPD
              </p>
            </div>
          )}

          {/* RESULT */}
          {isResult && (
            <div data-testid="risk-result" className="space-y-7 md:space-y-10 py-2 md:py-4">
              <div className="text-center space-y-5 md:space-y-6">
                <p className="micro-label text-[9px]">O Seu Score NIS2</p>
                <Gauge score={score} color={level.color} />
                <div className="space-y-3">
                  <div
                    className="font-cinzel text-2xl sm:text-3xl md:text-4xl"
                    style={{ color: level.color }}
                  >
                    Risco {level.label}
                  </div>
                  <p className="font-outfit text-white/65 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    {DIAGNOSIS[level.key]}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3 pt-2 md:pt-4">
                <button
                  onClick={() =>
                    onRequestReport?.() ||
                    document
                      .getElementById("captura")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-testid="risk-cta-report"
                  className="gold-btn bg-[#bf953f] text-black font-bold py-4 sm:py-5 px-6 sm:px-8 uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] hover:bg-white transition-all inline-flex items-center justify-center gap-3"
                >
                  <span>Receber Relatório Completo</span>
                  <ArrowRight size={14} className="relative z-[2]" />
                </button>
                <button
                  onClick={onPriorityClick}
                  data-testid="risk-cta-priority"
                  className="border border-white/20 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] sm:text-[11px] hover:border-[#bf953f] hover:text-[#bf953f] transition-all"
                >
                  Falar com Especialista
                </button>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={reset}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-[#bf953f] inline-flex items-center gap-2"
                >
                  <RefreshCw size={12} />
                  Refazer diagnóstico
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RiskCalculator;
