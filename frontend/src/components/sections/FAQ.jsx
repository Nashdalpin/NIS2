import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqs = [
  {
    q: "A minha empresa está abrangida pela NIS2?",
    a: "A NIS2 abrange entidades em sectores críticos (energia, transportes, banca, saúde, infraestruturas digitais, administração pública) e sectores importantes (correios, gestão de resíduos, alimentação, manufatura). Realizamos um diagnóstico de elegibilidade gratuito em 48h.",
  },
  {
    q: "Quais são as coimas reais aplicáveis em Portugal?",
    a: "Para entidades essenciais: até 10M€ ou 2% da faturação global anual (o que for mais alto). Para entidades importantes: até 7M€ ou 1.4% da faturação. Acresce responsabilidade pessoal dos administradores e suspensão temporária de cargos.",
  },
  {
    q: "Quanto tempo demora a implementação completa?",
    a: "O nosso framework de 90 dias entrega: Gap Analysis (semanas 1-3), Plano de Resposta a Incidentes (semanas 4-7), Governance e formação de executivos (semanas 8-10) e Carta de Conformidade Dalpin Heritage (semanas 11-13).",
  },
  {
    q: "Como funciona o reporte obrigatório de 24 horas?",
    a: "Em caso de incidente significativo, a NIS2 exige notificação ao CNCS em 24h (alerta inicial), 72h (avaliação intermédia) e 1 mês (relatório final). Implementamos monitorização e playbooks que tornam este timing automático e auditável.",
  },
  {
    q: "Trabalham com a minha cadeia de fornecedores?",
    a: "Sim. A NIS2 estende responsabilidades a fornecedores críticos. Realizamos due diligence de cibersegurança a parceiros, contratos de SLA e cláusulas de auditoria. Os elos mais fracos passam a ser contratualmente blindados.",
  },
  {
    q: "Quem é responsável pela equipa de auditoria?",
    a: "A Dalpin Heritage é dirigida por consultores com mais de 15 anos em auditoria de cibersegurança, certificações CISA, CISM, CISSP e experiência directa em CNCS, ENISA e Big4. Cada projecto tem um partner sénior dedicado.",
  },
];

export const FAQ = () => (
  <section
    id="faq"
    data-testid="faq-section"
    className="py-24 lg:py-32 px-6 bg-[#0a0a0a] border-y border-white/5"
  >
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <p className="micro-label mb-6">Dúvidas Recorrentes do Board</p>
        <h2 className="font-cinzel text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
          Respostas <span className="gold-text">precisas</span>.
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            data-testid={`faq-item-${i}`}
            className="border-b border-white/10 px-2"
          >
            <AccordionTrigger className="font-cinzel text-left text-base md:text-lg text-white hover:text-[#bf953f] py-6 transition-colors no-underline hover:no-underline">
              <span className="flex items-baseline gap-5">
                <span className="text-[10px] tracking-[0.3em] text-[#bf953f]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{f.q}</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="font-outfit text-white/60 text-base leading-relaxed pl-12 pb-6">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
