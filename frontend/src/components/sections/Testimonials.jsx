import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "A Dalpin transformou um pesadelo regulatório num plano executável em três meses. Hoje dormimos descansados.",
    name: "Mariana Castelo",
    role: "CEO, Grupo Industrial Atlântico",
    img: "https://images.unsplash.com/photo-1633366147060-ce9e1a9fd39c?crop=entropy&cs=srgb&fm=jpg&q=85&w=400",
  },
  {
    quote:
      "A profundidade técnica do gap analysis foi superior ao que vimos das Big4. E a metade do custo.",
    name: "André Vasconcelos",
    role: "CISO, Banco Privado Lusitano",
    img: "https://images.unsplash.com/photo-1767175620484-1ed37931a0d1?crop=entropy&cs=srgb&fm=jpg&q=85&w=400",
  },
  {
    quote:
      "Pela primeira vez, o board entendeu cibersegurança como activo patrimonial. Recomendo sem reservas.",
    name: "Sofia Leite Rocha",
    role: "Board Member, Energias do Tejo",
    img: "https://images.unsplash.com/photo-1638290047807-4c9d389b9aa6?crop=entropy&cs=srgb&fm=jpg&q=85&w=400",
  },
];

export const Testimonials = () => (
  <section
    id="testemunhos"
    data-testid="testimonials-section"
    className="py-24 lg:py-32 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-8">
        <div>
          <p className="micro-label mb-6">Discrição. Resultados.</p>
          <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-2xl">
            Quem confia, <span className="gold-text">não regressa</span>.
          </h2>
        </div>
        <p className="font-outfit text-white/50 text-base max-w-md">
          Trabalhamos com administradores e CISOs de organizações sob
          obrigações NIS2 em Portugal e na Europa. Algumas vozes do board.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <article
            key={i}
            data-testid={`testimonial-${i}`}
            className="glass-card p-8 lg:p-10 flex flex-col justify-between min-h-[420px] relative"
          >
            <Quote
              size={28}
              className="text-[#bf953f]/40 mb-6"
              strokeWidth={1.2}
            />
            <p className="font-cinzel italic text-lg text-white/85 leading-snug mb-10">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img
                src={t.img}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover grayscale"
              />
              <div>
                <div className="text-sm font-medium text-white">{t.name}</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-[#bf953f] mt-1">
                  {t.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
