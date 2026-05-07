import { Lock, Clock, ShieldCheck } from "lucide-react";

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

export const Risks = () => (
  <section
    id="riscos"
    data-testid="risks-section"
    className="py-16 md:py-24 lg:py-32 bg-[#0a0a0a] border-y border-white/5"
  >
    <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center mb-12 md:mb-20">
      <p className="micro-label mb-5 md:mb-6">Os Custos da Negligência</p>
      <h2 className="font-cinzel text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.15] italic max-w-4xl mx-auto">
        "A paz de espírito custa menos
        <br />
        que a <span className="gold-text not-italic">negligência</span>."
      </h2>
      <div className="h-px w-20 sm:w-24 bg-[#bf953f]/60 mx-auto mt-8 md:mt-12" />
    </div>

    <div className="max-w-6xl mx-auto px-5 sm:px-6 grid md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
      {risks.map((r) => {
        const Icon = r.icon;
        return (
          <div
            key={r.title}
            data-testid={`risk-card-${r.title.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-center md:text-left space-y-6 group"
          >
            <div className="w-14 h-14 border border-[#bf953f]/40 rounded-full flex items-center justify-center mx-auto md:mx-0 group-hover:border-[#bf953f] group-hover:bg-[#bf953f]/5 transition-all">
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
  </section>
);

export default Risks;
