import Marquee from "react-fast-marquee";

const items = [
  "Responsabilidade pessoal dos administradores",
  "Coimas até 2% da faturação global",
  "Prazo de transposição excedido",
  "+4.000 entidades sob vigilância em Portugal",
  "Reporte de incidentes em 24 horas",
  "Cadeia de fornecedores sob escrutínio",
];

export const WarningMarquee = () => (
  <div
    data-testid="warning-marquee"
    className="bg-white text-black border-y border-[#bf953f]"
  >
    <Marquee gradient={false} speed={45} pauseOnHover>
      <div className="flex items-center py-4">
        {items.concat(items).map((t, i) => (
          <div
            key={i}
            className="mx-12 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em]"
          >
            <span aria-hidden className="text-base leading-none">⚠</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </Marquee>
  </div>
);

export default WarningMarquee;
