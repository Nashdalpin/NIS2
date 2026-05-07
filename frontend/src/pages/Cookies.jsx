import LegalLayout, { Section } from "./LegalLayout";

export default function Cookies() {
  return (
    <LegalLayout title="Política de Cookies" lastUpdate="Maio 2026">
      <p className="font-outfit text-white/70 text-base leading-relaxed">
        Esta política explica como utilizamos cookies e tecnologias semelhantes
        no website <strong>nis2.dalpinheritage.com</strong>, em conformidade
        com a Lei n.º 41/2004 (Lei das Comunicações Electrónicas) e o RGPD.
      </p>

      <Section title="1. O que são Cookies">
        <p>
          Cookies são pequenos ficheiros de texto que são armazenados no seu
          dispositivo (computador, tablet ou telemóvel) quando visita um
          website. Servem para tornar a navegação mais eficiente, recordar as
          suas preferências e fornecer estatísticas anonimizadas.
        </p>
      </Section>

      <Section title="2. Cookies Utilizados">
        <h3 className="font-cinzel text-base text-[#bf953f] mt-6 mb-3">2.1 Estritamente Necessários</h3>
        <p>
          Estes cookies são essenciais para o funcionamento básico do Website
          e <strong>não requerem consentimento</strong>:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><code className="text-[#bf953f]">dalpin_cookie_consent</code> — guarda a sua escolha de consentimento (12 meses)</li>
          <li><code className="text-[#bf953f]">dhs_admin_token</code> — autenticação no painel administrativo (apenas para administradores autorizados)</li>
        </ul>

        <h3 className="font-cinzel text-base text-[#bf953f] mt-6 mb-3">2.2 Analíticos</h3>
        <p>
          Recolhem informação agregada e anónima sobre como os utilizadores
          interagem com o Website, ajudando-nos a melhorar a experiência:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>PostHog</strong> — análise de utilização anonimizada (12 meses, sem partilha com redes publicitárias)</li>
        </ul>
        <p className="text-sm text-white/50">
          Os IPs são truncados e o utilizador não é identificado pessoalmente.
        </p>

        <h3 className="font-cinzel text-base text-[#bf953f] mt-6 mb-3">2.3 Marketing</h3>
        <p>
          <strong>Não utilizamos</strong> cookies de marketing, retargeting ou
          publicidade comportamental. A nossa abordagem é estritamente B2B
          editorial, não publicitária.
        </p>
      </Section>

      <Section title="3. Como Gerir os Cookies">
        <p>
          Pode aceitar ou recusar cookies não essenciais através do banner de
          consentimento exibido na primeira visita. A sua escolha é guardada
          e respeitada em visitas futuras.
        </p>
        <p>
          Pode também controlar e apagar cookies directamente nas definições
          do seu browser:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer" className="text-[#bf953f] hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/pt-PT/kb/Activar%20e%20desactivar%20cookies" target="_blank" rel="noreferrer" className="text-[#bf953f] hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer" className="text-[#bf953f] hover:underline">Safari</a></li>
          <li><a href="https://support.microsoft.com/pt-pt/microsoft-edge" target="_blank" rel="noreferrer" className="text-[#bf953f] hover:underline">Microsoft Edge</a></li>
        </ul>
      </Section>

      <Section title="4. Consequências da Recusa">
        <p>
          A recusa de cookies analíticos não afecta a funcionalidade do
          Website. Apenas perderemos a capacidade de medir o impacto de
          melhorias.
        </p>
      </Section>

      <Section title="5. Alterações">
        <p>
          Esta política pode ser actualizada periodicamente. Em caso de
          alterações materiais, solicitaremos novo consentimento.
        </p>
      </Section>

      <Section title="6. Contacto">
        <p>
          Dúvidas sobre cookies?{" "}
          <a href="mailto:nash@dalpinheritage.com" className="text-[#bf953f] hover:underline">
            nash@dalpinheritage.com
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
