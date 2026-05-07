import LegalLayout, { Section } from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Política de Privacidade" lastUpdate="Maio 2026">
      <p className="font-outfit text-white/70 text-base leading-relaxed">
        A Dalpin Heritage Systems ("DHS", "nós") respeita a privacidade dos
        seus utilizadores e compromete-se a proteger os dados pessoais
        recolhidos através do website <strong>nis2.dalpinheritage.com</strong>,
        em conformidade com o Regulamento Geral de Proteção de Dados (RGPD —
        Regulamento (UE) 2016/679) e a Lei n.º 58/2019, de 8 de agosto.
      </p>

      <Section title="1. Responsável pelo Tratamento">
        <p>
          <strong>Dalpin Heritage Systems</strong>
          <br />
          Av. da Liberdade, 110 · 1250-146 Lisboa · Portugal
          <br />
          Email: <a href="mailto:nash@dalpinheritage.com" className="text-[#bf953f] hover:underline">nash@dalpinheritage.com</a>
        </p>
      </Section>

      <Section title="2. Dados Recolhidos">
        <p>Recolhemos os seguintes dados pessoais quando preenche um formulário no nosso website:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Identificação:</strong> nome completo, cargo / função</li>
          <li><strong>Contacto:</strong> email corporativo, opcionalmente nome da organização</li>
          <li><strong>Dados técnicos:</strong> endereço IP, user-agent do browser, referrer (apenas no download da Checklist)</li>
          <li><strong>Diagnóstico de risco:</strong> respostas às perguntas do Risk Calculator (apenas se o utilizador completar)</li>
        </ul>
      </Section>

      <Section title="3. Finalidades e Base Legal">
        <p>Os dados são tratados para as seguintes finalidades:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Envio do recurso solicitado</strong> (Checklist Executiva NIS2) — execução pré-contratual</li>
          <li><strong>Contacto comercial subsequente</strong> sobre serviços de auditoria NIS2 — interesse legítimo (Art. 6.º/1/f RGPD)</li>
          <li><strong>Estatística e melhoria do serviço</strong> — interesse legítimo, dados agregados/anonimizados</li>
          <li><strong>Cumprimento de obrigações legais</strong> — quando aplicável (fiscais, contratuais)</li>
        </ul>
      </Section>

      <Section title="4. Conservação dos Dados">
        <p>
          Conservamos os dados pelo período estritamente necessário às
          finalidades para que foram recolhidos:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Leads não convertidos em cliente: <strong>3 anos</strong> (após o que são apagados ou anonimizados)</li>
          <li>Clientes: durante a duração do contrato + 10 anos (obrigação fiscal)</li>
          <li>Logs técnicos de download: <strong>12 meses</strong></li>
        </ul>
      </Section>

      <Section title="5. Partilha com Terceiros">
        <p>
          Os seus dados não são vendidos, alugados ou partilhados com terceiros
          para fins de marketing. Utilizamos os seguintes subcontratantes RGPD:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Resend</strong> (envio de emails transacionais) — UE/EUA com cláusulas-tipo</li>
          <li><strong>Notion Labs</strong> (CRM interno de leads) — EUA com cláusulas-tipo RGPD</li>
          <li><strong>MongoDB Atlas</strong> (armazenamento de dados) — UE</li>
          <li><strong>Render / Vercel</strong> (alojamento da aplicação)</li>
        </ul>
        <p>
          Todos cumprem com requisitos RGPD e foram seleccionados pela sua
          adequação técnica e organizativa.
        </p>
      </Section>

      <Section title="6. Os Seus Direitos">
        <p>Nos termos do RGPD, tem o direito de:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Acesso:</strong> obter cópia dos seus dados pessoais</li>
          <li><strong>Rectificação:</strong> corrigir dados imprecisos</li>
          <li><strong>Apagamento:</strong> "direito ao esquecimento"</li>
          <li><strong>Limitação do tratamento</strong> em determinadas circunstâncias</li>
          <li><strong>Portabilidade:</strong> receber os dados em formato estruturado</li>
          <li><strong>Oposição</strong> ao tratamento baseado em interesse legítimo</li>
          <li><strong>Reclamação à CNPD</strong> — Comissão Nacional de Protecção de Dados (<a href="https://www.cnpd.pt" target="_blank" rel="noreferrer" className="text-[#bf953f] hover:underline">www.cnpd.pt</a>)</li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, contacte-nos através de{" "}
          <a href="mailto:nash@dalpinheritage.com" className="text-[#bf953f] hover:underline">
            nash@dalpinheritage.com
          </a>. Responderemos no prazo máximo de 30 dias.
        </p>
      </Section>

      <Section title="7. Segurança">
        <p>
          Aplicamos medidas técnicas e organizativas adequadas para proteger os
          seus dados contra acesso não autorizado, alteração, divulgação ou
          destruição. Estas incluem encriptação em trânsito (TLS 1.3),
          autenticação por token nos endpoints administrativos, e auditoria
          regular dos acessos.
        </p>
      </Section>

      <Section title="8. Alterações">
        <p>
          Esta política pode ser actualizada periodicamente. Recomendamos a
          consulta regular desta página. Alterações materiais serão
          comunicadas por email aos utilizadores afectados.
        </p>
      </Section>
    </LegalLayout>
  );
}
