import { useRef, useState } from "react";
import { Lock, Clock, ShieldCheck } from "lucide-react";
import { OrnamentDivider } from "./Ornaments";

const ROMAN = ["I", "II", "III"];

const risks = [
  {
    icon: Lock,
    title: "Segurança da Cadeia",
    desc: "Se os seus fornecedores falham, você é o responsável perante a lei. Blindamos os elos mais fracos da cadeia de valor.",
  },
  {
    icon: Clock,
    title: "Regra de Ouro: 24 Horas",
    desc: "O tempo para notificação de incidentes é brutal. Implementamos monitorização em tempo real para conformidade imediata.",
  },
  {
    icon: ShieldCheck,
    title: "Responsabilidade Civil",
    desc: "Proteção patrimonial e reputacional para administradores e quadros diretivos. Defesa jurídica preventiva.",
  },
];

export const Risks = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(idx, risks.length - 1));
  };

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
  <section
    id="riscos"
    data-testid="risks-section"
    className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a] border-y border-white/5"
  >
    <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center mb-12 md:mb-20">
      <p className="micro-label mb-5 md:mb-6 inline-flex items-center gap-3">
        <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">II</span>
        <span className="w-6 h-px bg-[#bf953f]/40" />
        <span>Os Custos da Negligência</span>
        <span className="w-6 h-px bg-[#bf953f]/40" />
        <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">II</span>
      </p>
      <h2 className="font-cinzel text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] italic max-w-4xl mx-auto">
        "A paz de espírito custa menos
        <br />
        que a <span className="gold-text not-italic">negligência</span>."
      </h2>
      <OrnamentDivider className="mt-8 md:mt-12 max-w-xs mx-auto" />
    </div>

    <div className="max-w-6xl mx-auto px-5 sm:px-6">
      {/* Mobile: roman numeral tabs */}
      <div className="flex md:hidden items-center justify-center gap-6 mb-8">
        {risks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Risco ${ROMAN[i]}`}
            className="flex items-center gap-3 group/t"
          >
            <span
              className={`font-cinzel text-base tracking-[0.2em] transition-all duration-500 ${
                active === i
                  ? "text-[#bf953f] scale-110"
                  : "text-white/25 group-hover/t:text-white/50"
              }`}
            >
              {ROMAN[i]}
            </span>
            {i < risks.length - 1 && (
              <span
                className={`w-3 h-px transition-colors ${
                  active === i || active === i + 1
                    ? "bg-[#bf953f]/60"
                    : "bg-white/10"
                }`}
              />
            )}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex md:grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-5 md:mx-0 px-5 md:px-0 pb-3 md:pb-0 no-scrollbar"
      >
        {risks.map((r, i) => {
          const Icon = r.icon;
          return (
            <div
              key={r.title}
              data-testid={`risk-card-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-center md:text-left space-y-6 group flex-shrink-0 w-full md:w-auto basis-full md:basis-auto min-w-0 snap-center md:snap-align-none"
            >
              <div
                className={`w-14 h-14 border rounded-full flex items-center justify-center mx-auto md:mx-0 transition-all ${
                  active === i
                    ? "border-[#bf953f] bg-[#bf953f]/10 md:border-[#bf953f]/40 md:bg-transparent"
                    : "border-[#bf953f]/40"
                } group-hover:border-[#bf953f] group-hover:bg-[#bf953f]/5`}
              >
                <Icon size={20} className="text-[#bf953f]" />
              </div>
              <h3 className="font-cinzel text-xl text-white">{r.title}</h3>
              <p className="font-outfit text-sm text-white/55 leading-relaxed">
                {r.desc}
              </p>
              <div className="vertical-divider md:max-w-[60%]" />
            </div>
          );
        })}
      </div>
    </div>
  </section>
  );
};

export default Risks;
