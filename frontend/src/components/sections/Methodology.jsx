import { ArrowUpRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Gap Analysis",
    desc: "Auditoria técnica profunda. Mapeamento exaustivo de vulnerabilidades críticas e ativos sob escopo NIS2.",
  },
  {
    n: "02",
    title: "Plano de Resposta",
    desc: "Desenvolvimento de IRP (Incident Response Plan) em conformidade com o CNCS e ENISA.",
  },
  {
    n: "03",
    title: "Governance",
    desc: "Formação de executivos e definição de matrizes de responsabilidade pessoal para a Administração.",
  },
  {
    n: "04",
    title: "Compliance",
    desc: "Emissão da Carta de Conformidade Dalpin Heritage para apresentação a stakeholders e reguladores.",
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
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-testid={`step-card-${s.n}`}
              className="glass-card p-8 lg:p-10 relative overflow-hidden min-h-[220px]"
              style={{ marginTop: i % 2 === 1 ? "32px" : "0" }}
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
    </div>
  </section>
);

export default Methodology;
