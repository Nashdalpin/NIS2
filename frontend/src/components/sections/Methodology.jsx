import { ArrowUpRight } from "lucide-react";

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

export const Methodology = () => (
  <section id="metodologia" data-testid="methodology-section" className="py-24 lg:py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start mb-20">
        <div>
          <p className="micro-label mb-6">Nosso Framework</p>
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-8">
            90 Dias Para a
            <br />
            <span className="gold-text">Resiliência Total.</span>
          </h2>
          <p className="font-outfit text-white/60 text-lg leading-relaxed mb-8 max-w-md">
            Não entregamos apenas relatórios. Entregamos uma infraestrutura
            blindada e conformidade jurídica incontestável. O método foca no
            que é crítico — sem ruído.
          </p>
          <a
            href="#captura"
            className="inline-flex items-center gap-3 text-[#bf953f] text-[11px] uppercase tracking-[0.35em] font-bold border-b border-[#bf953f]/40 pb-2 hover:border-[#bf953f] transition-all"
          >
            Ver detalhes do plano
            <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((s) => (
            <div
              key={s.n}
              data-testid={`step-card-${s.n}`}
              className="glass-card p-8 lg:p-10 relative overflow-hidden min-h-[220px]"
            >
              <span className="step-number">{s.n}</span>
              <div className="relative z-10">
                <p className="micro-label mb-4 text-[9px]">Fase {s.n}</p>
                <h3 className="font-cinzel text-xl text-white mb-4">
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

      {/* Horizontal 90-day timeline */}
      <div className="mt-20 pt-16 border-t border-white/10">
        <div className="flex items-center justify-between mb-8">
          <p className="micro-label text-[9px]">Cronograma</p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            90 Dias · 4 Fases
          </p>
        </div>

        {/* Timeline bar */}
        <div className="relative mt-10">
          <div className="absolute left-0 right-0 top-2.5 h-px bg-white/10" />
          <div className="absolute left-0 top-2.5 h-px bg-[#bf953f]/60" style={{ width: "100%" }} />
          <div className="grid grid-cols-4 relative">
            {steps.map((s) => (
              <div
                key={s.n}
                data-testid={`timeline-${s.n}`}
                className="flex flex-col items-start gap-4"
              >
                <div className="w-5 h-5 border border-[#bf953f] bg-[#050505] rounded-full flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-[#bf953f] rounded-full" />
                </div>
                <div className="pr-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#bf953f] mb-1">
                    {s.day}
                  </p>
                  <p className="font-cinzel text-sm md:text-base text-white">
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Methodology;
