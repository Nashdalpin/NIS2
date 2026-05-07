import { useRef, useState } from "react";
import { Quote } from "lucide-react";
import { Corners } from "./Ornaments";

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

export const Testimonials = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.min(idx, testimonials.length - 1));
  };

  const goTo = (i) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
  <section
    id="testemunhos"
    data-testid="testimonials-section"
    className="py-16 md:py-24 lg:py-32 px-5 sm:px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-10 md:mb-16 gap-6 md:gap-8">
        <div>
          <p className="micro-label mb-5 md:mb-6 flex items-center gap-3">
            <span className="font-cinzel tracking-[0.2em] text-[#bf953f]/70">IV</span>
            <span className="w-6 h-px bg-[#bf953f]/40" />
            <span>Discrição. Resultados.</span>
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight max-w-2xl">
            Quem confia, <span className="gold-text">não regressa</span>.
          </h2>
        </div>
        <p className="font-outfit text-white/50 text-sm sm:text-base max-w-md">
          Por respeito aos nossos clientes, mantemos a identidade protegida.
          Administradores e CISOs de organizações sob obrigações NIS2 em
          Portugal e na Europa.
        </p>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-5 sm:-mx-6 md:mx-0 px-5 sm:px-6 md:px-0 pb-2 md:pb-0 no-scrollbar"
      >
        {testimonials.map((t, i) => (
          <article
            key={i}
            data-testid={`testimonial-${i}`}
            className="group glass-card p-6 md:p-8 lg:p-10 flex flex-col justify-between md:min-h-[420px] relative overflow-hidden flex-shrink-0 md:flex-shrink min-w-[88%] md:min-w-0 snap-center md:snap-align-none"
          >
            <Corners />
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 -right-2 font-cinzel text-[140px] leading-none text-[#bf953f]/[0.06] select-none"
            >
              "
            </span>
            <Quote
              size={24}
              className="text-[#bf953f]/40 mb-4 md:mb-6 relative z-10"
              strokeWidth={1.2}
            />
            <p className="font-cinzel italic text-base md:text-lg text-white/85 leading-snug mb-6 md:mb-10 relative z-10">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-white/10">
              <div className="w-11 h-11 md:w-12 md:h-12 border border-[#bf953f]/50 flex items-center justify-center font-cinzel text-xs md:text-sm text-[#bf953f] tracking-widest shrink-0">
                {t.name.replace(/\s+/g, "")}
              </div>
              <div className="min-w-0">
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-white/80">
                  Identidade protegida
                </div>
                <div className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-[#bf953f] mt-1 truncate">
                  {t.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile: gold pill pagination */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-7">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Testemunho ${i + 1}`}
            className={`h-1 rounded-full transition-all duration-500 ${
              active === i
                ? "w-10 bg-[#bf953f] shadow-[0_0_8px_rgba(191,149,63,0.5)]"
                : "w-2 bg-white/15 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  </section>
  );
};

export default Testimonials;
