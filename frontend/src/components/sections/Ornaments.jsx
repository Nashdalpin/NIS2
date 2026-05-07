export const OrnamentDivider = ({ className = "" }) => (
  <div className={`ornament-divider ${className}`} aria-hidden>
    <span />
  </div>
);

export const Corners = () => (
  <>
    <span className="corner-tl" aria-hidden />
    <span className="corner-tr" aria-hidden />
    <span className="corner-bl" aria-hidden />
    <span className="corner-br" aria-hidden />
  </>
);

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export const SectionLabel = ({ numeral, children }) => (
  <p className="micro-label flex items-center justify-center gap-3 mb-5 md:mb-6">
    {numeral && (
      <>
        <span className="font-cinzel not-italic tracking-[0.2em] text-[#bf953f]/70">
          {ROMAN[numeral - 1] || numeral}
        </span>
        <span className="w-6 h-px bg-[#bf953f]/40" />
      </>
    )}
    <span>{children}</span>
  </p>
);

export default OrnamentDivider;
