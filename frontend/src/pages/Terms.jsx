import LegalLayout, { Section } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Termos de Utilização" lastUpdate="Maio 2026">
      <p className="font-outfit text-white/70 text-base leading-relaxed">
        Os presentes Termos regulam a utilização do website{" "}
        <strong>nis2.dalpinheritage.com</strong> ("Website") operado pela{" "}
        <strong>Dalpin Heritage Systems</strong> ("DHS", "nós"). Ao aceder e
        utilizar o Website, aceita integralmente estes Termos.
      </p>

      <Section title="1. Objecto">
        <p>
          O Website disponibiliza informação sobre serviços de auditoria,
          implementação e governance de cibersegurança em conformidade com a
          Diretiva (UE) 2022/2555 (NIS2), bem como recursos descarregáveis
          (Checklist Executiva NIS2) e ferramentas de auto-diagnóstico.
        </p>
      </Section>

      <Section title="2. Propriedade Intelectual">
        <p>
          Todos os conteúdos do Website — incluindo texto, gráficos, logótipo,
          ícones, imagens, vídeos, base de dados e software — são propriedade
          exclusiva da Dalpin Heritage Systems ou licenciados a esta, e estão
          protegidos pela legislação aplicável em matéria de direitos de autor
          e propriedade industrial.
        </p>
        <p>
          A Checklist Executiva NIS2 é fornecida ao utilizador para uso
          interno na sua organização. É proibida a sua redistribuição,
          comercialização ou utilização para criar materiais derivados sem
          autorização escrita prévia.
        </p>
      </Section>

      <Section title="3. Conduta do Utilizador">
        <p>O utilizador compromete-se a não:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Utilizar o Website para fins ilegais ou contrários a estes Termos</li>
          <li>Submeter dados falsos nos formulários</li>
          <li>Tentar aceder a áreas restritas, contornar mecanismos de autenticação ou comprometer a segurança</li>
          <li>Realizar engenharia reversa, scraping massivo ou ataques DoS</li>
          <li>Utilizar bots, scripts ou automação não autorizada</li>
        </ul>
      </Section>

      <Section title="4. Limitação de Responsabilidade">
        <p>
          Os recursos disponibilizados (Checklist, Risk Calculator, etc.) têm
          carácter <strong>informativo e orientativo</strong>. Não substituem
          aconselhamento jurídico, técnico ou de cibersegurança específico
          para a sua organização.
        </p>
        <p>
          O Risk Calculator fornece uma estimativa baseada em parâmetros
          gerais e não constitui auditoria formal NIS2. Para uma avaliação
          juridicamente válida, contacte-nos para um Readiness Assessment
          formal.
        </p>
        <p>
          A DHS não é responsável por danos directos ou indirectos resultantes
          da utilização ou impossibilidade de utilização do Website ou dos
          conteúdos disponibilizados gratuitamente.
        </p>
      </Section>

      <Section title="5. Disponibilidade do Serviço">
        <p>
          Esforçamo-nos por manter o Website disponível 24/7. No entanto, não
          garantimos disponibilidade contínua devido a manutenção programada,
          falhas técnicas, ataques ou força maior. Reservamo-nos o direito de
          interromper, suspender ou descontinuar o Website ou parte dele a
          qualquer momento.
        </p>
      </Section>

      <Section title="6. Privacidade">
        <p>
          O tratamento dos seus dados pessoais é regulado pela nossa{" "}
          <a href="/privacidade" className="text-[#bf953f] hover:underline">
            Política de Privacidade
          </a>
          , parte integrante destes Termos.
        </p>
      </Section>

      <Section title="7. Lei Aplicável e Foro">
        <p>
          Os presentes Termos regem-se pela <strong>lei portuguesa</strong>.
          Para resolução de quaisquer litígios decorrentes da interpretação ou
          execução destes Termos, é competente o <strong>foro da Comarca de
          Lisboa</strong>, com expressa renúncia a qualquer outro.
        </p>
      </Section>

      <Section title="8. Contacto">
        <p>
          Para questões sobre estes Termos:{" "}
          <a href="mailto:nash@dalpinheritage.com" className="text-[#bf953f] hover:underline">
            nash@dalpinheritage.com
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
