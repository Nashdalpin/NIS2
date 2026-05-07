import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Corners } from "./Ornaments";

const steps = [
  {
    n: "01",
    title: "Gap Analysis",
    desc: "Auditoria técnica profunda. Mapeamento exaustivo de vulnerabilidades críticas e ativos sob escopo NIS2.",
    day: "Dia 0-21",
  },
  {
    n: "02",
    title: "Plano de Resposta",
    desc: "Desenvolvimento de IRP (Incident Response Plan) em conformidade com o CNCS e ENISA.",
    day: "Dia 22-49",
  },
  {
    n: "03",
    title: "Governance",
    desc: "Formação de executivos e definição de matrizes de responsabilidade pessoal para a Administração.",
    day: "Dia 50-70",
  },
  {
    n: "04",
    title: "Compliance",
    desc: "Emissão da Carta de Conformidade Dalpin Heritage para apresentação a stakeholders e reguladores.",
    day: "Dia 71-90",
  },
];

export const Methodology = () => {
  const [activePhase, setActivePhase] = useState(0);
  const phasesRef = useRef(null);

  const handlePhaseScroll = (e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActivePhase(Math.min(idx, steps.length - 1));
  };

  const goToPhase = (i) => {
    const el = phasesRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
  <section id="metodologia" data-testid="methodology-section" className="py-16 md:py-24 lg:py-32 px-5 sm:px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-start mb-12 md:mb-20">
        <div>
          <p className="micro-label mb-5 md:mb-6 flex items-center gap-3">
            <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">I</span>
            <span className="w-6 h-px bg-[#bf953f]/40" />
            <span>Nosso Framework</span>
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6 md:mb-8">
            90 Dias Para a
            <br />
            <span className="gold-text">Resiliência Total.</span>
          </h2>
          <p className="font-outfit text-white/60 text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-md">
            Não entregamos apenas relatórios. Entregamos uma infraestrutura
            blindada e conformidade jurídica incontestável. O método foca no
            que é crítico — sem ruído.
          </p>
          <a
            href="#captura"
            className="inline-flex items-center gap-3 text-[#bf953f] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] font-bold border-b border-[#bf953f]/40 pb-2 hover:border-[#bf953f] transition-all"
          >
            Ver detalhes do plano
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div>
          {/* Mobile: numbered pagination */}
          <div className="flex sm:hidden items-center justify-center gap-5 mb-5">
            {steps.map((s, i) => (
              <button
                key={s.n}
                onClick={() => goToPhase(i)}
                aria-label={`Fase ${s.n}`}
                className="group/p flex flex-col items-center gap-1.5"
              >
                <span
                  className={`font-cinzel text-xs tabular-nums tracking-[0.15em] transition-colors ${
                    activePhase === i ? "text-[#bf953f]" : "text-white/30"
                  }`}
                >
                  {s.n}
                </span>
                <span
                  className={`h-px transition-all duration-500 ${
                    activePhase === i ? "w-8 bg-[#bf953f]" : "w-4 bg-white/15"
                  }`}
                />
              </button>
            ))}
          </div>

          <div
            ref={phasesRef}
            onScroll={handlePhaseScroll}
            className="flex sm:grid sm:grid-cols-2 gap-4 md:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none -mx-5 sm:mx-0 px-5 sm:px-0 pb-3 sm:pb-0 no-scrollbar"
          >
            {steps.map((s) => (
              <div
                key={s.n}
                data-testid={`step-card-${s.n}`}
                className="group glass-card p-6 md:p-8 lg:p-10 relative overflow-hidden min-h-[180px] md:min-h-[220px] flex-shrink-0 sm:flex-shrink min-w-[82%] sm:min-w-0 snap-start sm:snap-align-none"
              >
                <Corners />
                <span className="step-number">{s.n}</span>
                <div className="relative z-10">
                  <p className="micro-label mb-3 md:mb-4 text-[9px]">Fase {s.n}</p>
                  <h3 className="font-cinzel text-lg md:text-xl text-white mb-3 md:mb-4">
                    {s.title}
                  </h3>
                  <p className="font-outfit text-sm text-white/55 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal 90-day timeline */}
      <div className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <p className="micro-label text-[9px]">Cronograma</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            90 Dias · 4 Fases
          </p>
        </div>

        {/* Timeline bar - Scrollable on mobile */}
        <div className="relative mt-8 md:mt-10 overflow-x-auto no-scrollbar pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6 lg:mx-0 lg:px-0">
          <div className="min-w-[700px] lg:min-w-full relative">
            <div className="absolute left-0 right-0 top-2.5 h-px bg-white/10" />
            <div className="absolute left-0 top-2.5 h-px bg-[#bf953f]/60" style={{ width: "100%" }} />
            
            <div className="grid grid-cols-4 relative">
              {steps.map((s) => (
                <div
                  key={s.n}
                  data-testid={`timeline-${s.n}`}
                  className="flex flex-col items-start gap-4"
                >
                  <div className="flex-shrink-0 w-5 h-5 border border-[#bf953f] bg-[#050505] rounded-full flex items-center justify-center relative z-10">
                    <span className="w-1.5 h-1.5 bg-[#bf953f] rounded-full" />
                  </div>
                  <div className="pr-4">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#bf953f] mb-1">
                      {s.day}
                    </p>
                    <p className="font-cinzel text-sm md:text-base text-white whitespace-nowrap">
                      {s.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Visual cue for mobile scrolling */}
        <div className="flex lg:hidden items-center gap-2 mt-6 text-white/30 text-[9px] uppercase tracking-[0.3em] justify-center animate-pulse">
          <span className="w-8 h-px bg-white/10" />
          <span>Deslize para navegar</span>
          <ArrowUpRight size={10} className="rotate-90 opacity-50" />
          <span className="w-8 h-px bg-white/10" />
        </div>
      </div>
    </div>
  </section>
  );
};

export default Methodology;
