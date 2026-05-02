const sectors = [
  "Banca",
  "Energia",
  "Saúde",
  "Telecom",
  "Transportes",
  "Administração Pública",
  "Infraestrutura Digital",
  "Manufatura Crítica",
];

export const TrustStrip = () => (
  <section
    data-testid="trust-strip"
    className="border-y border-white/10 py-10 px-6 bg-[#070707]"
  >
    <div className="max-w-7xl mx-auto">
      <p className="micro-label text-[9px] text-center mb-6 text-white/50">
        Confiança de operadores em
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {sectors.map((s, i) => (
          <span
            key={s}
            className="font-cinzel text-sm md:text-base text-white/40 hover:text-[#bf953f] transition-colors flex items-center gap-10"
          >
            {s}
            {i !== sectors.length - 1 && (
              <span className="hidden md:inline w-1 h-1 bg-[#bf953f]/50 rounded-full" />
            )}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
