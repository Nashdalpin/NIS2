import { useEffect, useState } from "react";

// Public reference: NIS2 transposition deadline was 17 Oct 2024.
// We track ongoing days since that deadline + days to the next CNCS audit cycle.
const TRANSPOSITION_DATE = new Date("2024-10-17T00:00:00Z").getTime();
// Next public audit window — symbolic forward target (next 30 Jun)
const nextAuditTarget = () => {
  const now = new Date();
  const target = new Date(Date.UTC(now.getUTCFullYear(), 5, 30, 0, 0, 0));
  if (target.getTime() < now.getTime()) target.setUTCFullYear(now.getUTCFullYear() + 1);
  return target.getTime();
};

const fmt = (ms) => {
  if (ms < 0) ms = 0;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  const secs = Math.floor((ms % 60000) / 1000);
  return { days, hours, mins, secs };
};

const Cell = ({ value, label, gold = false }) => (
  <div className="text-center min-w-0 flex-1 sm:flex-none sm:min-w-[70px]">
    <div
      className={`font-cinzel text-2xl sm:text-3xl md:text-5xl leading-none tabular-nums ${
        gold ? "gold-text" : "text-white"
      }`}
    >
      {String(value).padStart(2, "0")}
    </div>
    <div className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/40 mt-2">
      {label}
    </div>
  </div>
);

export const Countdown = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const elapsed = fmt(now - TRANSPOSITION_DATE);
  const audit = fmt(nextAuditTarget() - now);

  return (
    <section
      id="countdown"
      data-testid="countdown-section"
      className="py-14 md:py-20 lg:py-28 px-5 sm:px-6 bg-[#070707] border-y border-white/10 relative overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] -z-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(191,149,63,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
        <div>
          <p className="micro-label mb-4 md:mb-5 text-[9px]">
            Cronómetro Regulatório · Tempo Real
          </p>
          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
            O prazo já passou.
            <br />
            <span className="gold-text">A vigilância continua.</span>
          </h2>
          <p className="font-outfit text-white/55 text-sm sm:text-base mt-5 md:mt-6 leading-relaxed max-w-md">
            A transposição da NIS2 venceu a 17 Outubro 2024. Cada dia
            adicional sem conformidade aumenta a sua exposição a coimas e
            responsabilidade pessoal.
          </p>
        </div>

        <div className="space-y-7 md:space-y-10">
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[#bf953f] mb-4 md:mb-5">
              Desde o vencimento da transposição
            </p>
            <div className="flex items-end gap-2 sm:gap-4 md:gap-6">
              <Cell value={elapsed.days} label="Dias" gold />
              <Cell value={elapsed.hours} label="Horas" />
              <Cell value={elapsed.mins} label="Min" />
              <Cell value={elapsed.secs} label="Seg" />
            </div>
          </div>
          <div className="h-px bg-white/10" />
          <div>
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/50 mb-4 md:mb-5">
              Para a próxima janela de auditoria CNCS
            </p>
            <div className="flex items-end gap-2 sm:gap-4 md:gap-6 opacity-80">
              <Cell value={audit.days} label="Dias" />
              <Cell value={audit.hours} label="Horas" />
              <Cell value={audit.mins} label="Min" />
              <Cell value={audit.secs} label="Seg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
