import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "A Dalpin transformou um pesadelo regulatório num plano executável em três meses. Hoje dormimos descansados.",
    name: "M. C.",
    role: "CEO · Grupo Industrial Atlântico",
  },
  {
    quote:
      "A profundidade técnica do gap analysis foi superior ao que vimos das Big4. E a metade do custo.",
    name: "A. V.",
    role: "CISO · Banco Privado Lusitano",
  },
  {
    quote:
      "Pela primeira vez, o board entendeu cibersegurança como activo patrimonial. Recomendo sem reservas.",
    name: "S. L. R.",
    role: "Board Member · Energias do Tejo",
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
          Por respeito aos nossos clientes, mantemos a identidade protegida.
          Administradores e CISOs de organizações sob obrigações NIS2 em
          Portugal e na Europa.
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
              <div className="w-12 h-12 border border-[#bf953f]/50 flex items-center justify-center font-cinzel text-sm text-[#bf953f] tracking-widest">
                {t.name.replace(/\s+/g, "")}
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/80">
                  Identidade protegida
                </div>
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
