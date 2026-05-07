import { ArrowDown } from "lucide-react";

export const Hero = ({ onScrollDown, onPriorityClick }) => {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 sm:px-6 overflow-hidden grain pt-28 pb-24 sm:py-0"
    >
      {/* Radar rings */}
      <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
        <div className="radar-ring w-72 h-72" />
        <div className="radar-ring w-72 h-72" style={{ animationDelay: "1s" }} />
        <div className="radar-ring w-72 h-72" style={{ animationDelay: "2s" }} />
        <div className="radar-ring w-72 h-72" style={{ animationDelay: "3s" }} />
      </div>

      {/* Soft gold radial */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(191,149,63,0.10) 0%, rgba(191,149,63,0) 65%)",
        }}
      />

      {/* Subtle horizontal lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#bf953f]/20 to-transparent -z-10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#bf953f]/20 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto space-y-7 sm:space-y-10">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 sm:px-4 sm:py-2 border border-[#bf953f]/40 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#bf953f] animate-pulse" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-[#bf953f] font-bold">
            Diretiva UE 2022/2555 (NIS2)
          </span>
        </div>

        <h1
          data-testid="hero-headline"
          className="font-cinzel text-[2.5rem] leading-[1.05] sm:text-5xl md:text-7xl lg:text-8xl tracking-tight"
        >
          Proteja o seu <span className="gold-text">Legado</span>,
          <br />
          Domine o <span className="opacity-40">Risco</span>.
        </h1>

        <p className="font-outfit text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
          Transformamos a complexidade legal em{" "}
          <span className="text-white border-b border-[#bf953f]">
            vantagem estratégica
          </span>
          . Auditoria e implementação NIS2 para empresas que não aceitam falhas.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center pt-2 sm:pt-6 flex-wrap">
          <a
            href="#captura"
            data-testid="hero-primary-cta"
            className="group gold-bg text-black py-4 sm:py-5 px-8 sm:px-12 font-bold text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] hover:brightness-110 transition-all duration-500 inline-flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(191,149,63,0.25)]"
          >
            Descarregar Protocolo
            <span className="block w-6 h-px bg-black transition-all group-hover:w-10" />
          </a>
          <a
            href="https://book.morgen.so/nashdalpin791/nas"
            target="_blank"
            rel="noreferrer"
            data-testid="hero-calendly-cta"
            className="border border-[#bf953f]/40 text-[#bf953f] py-4 sm:py-5 px-8 sm:px-10 font-bold text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] hover:bg-[#bf953f]/10 hover:border-[#bf953f] transition-all duration-500 inline-flex items-center justify-center gap-3"
          >
            Agendar Consulta
          </a>
          <button
            onClick={onPriorityClick}
            data-testid="hero-secondary-cta"
            className="border border-white/30 text-white py-4 sm:py-5 px-8 sm:px-10 font-bold text-[11px] uppercase tracking-[0.3em] sm:tracking-[0.35em] hover:border-white/60 transition-all duration-500"
          >
            Priority Audit
          </button>
        </div>

        <div className="grid grid-cols-3 sm:flex sm:items-center sm:justify-center gap-4 sm:gap-12 pt-8 sm:pt-12 opacity-60 sm:opacity-50 max-w-md sm:max-w-none mx-auto">
          <div className="text-center">
            <div className="font-cinzel text-lg sm:text-2xl text-[#bf953f]">+4.000</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 mt-1 leading-tight">
              Entidades em Portugal
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center border-x sm:border-x-0 border-white/10 sm:border-0">
            <div className="font-cinzel text-lg sm:text-2xl text-[#bf953f]">10M€</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 mt-1 leading-tight">
              Coima máxima
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="font-cinzel text-lg sm:text-2xl text-[#bf953f]">24h</div>
            <div className="text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/50 mt-1 leading-tight">
              Reporte obrigatório
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onScrollDown}
        aria-label="Scroll"
        className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 hover:text-[#bf953f] transition-colors"
      >
        <ArrowDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;
