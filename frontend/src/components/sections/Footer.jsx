import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => (
  <footer
    data-testid="site-footer"
    className="border-t border-white/10 bg-[#030303] pt-20 pb-10 px-6"
  >
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 border border-[#bf953f] flex items-center justify-center">
              <span className="font-cinzel text-[10px] tracking-[0.1em] text-[#bf953f]">DHS</span>
            </span>
            <span className="font-cinzel text-xs md:text-sm tracking-[0.35em] text-white">
              DALPIN HERITAGE SYSTEMS
            </span>
          </div>
          <p className="font-outfit text-white/55 text-sm leading-relaxed max-w-md">
            Auditoria, implementação e governance de cibersegurança em
            conformidade com a Diretiva (UE) 2022/2555 (NIS2). Discrição
            absoluta. Resultados auditáveis.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#bf953f]">
              Member of
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              CNCS · ENISA Network · ISO 27001
            </span>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <p className="micro-label text-[9px]">Empresa</p>
          <ul className="space-y-3 font-outfit text-sm">
            <li><a href="#metodologia" className="text-white/60 hover:text-[#bf953f]">Metodologia</a></li>
            <li><a href="#riscos" className="text-white/60 hover:text-[#bf953f]">Riscos</a></li>
            <li><a href="#testemunhos" className="text-white/60 hover:text-[#bf953f]">Testemunhos</a></li>
            <li><a href="#faq" className="text-white/60 hover:text-[#bf953f]">FAQ</a></li>
          </ul>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <p className="micro-label text-[9px]">Legal</p>
          <ul className="space-y-3 font-outfit text-sm">
            <li><a href="/privacidade" className="text-white/60 hover:text-[#bf953f]">Privacidade</a></li>
            <li><a href="/cookies" className="text-white/60 hover:text-[#bf953f]">Cookies</a></li>
            <li><a href="/termos" className="text-white/60 hover:text-[#bf953f]">Termos</a></li>
            <li><a href="/privacidade" className="text-white/60 hover:text-[#bf953f]">RGPD</a></li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <p className="micro-label text-[9px]">Contacto</p>
          <ul className="space-y-3 font-outfit text-sm text-white/60">
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-[#bf953f] mt-1 shrink-0" />
              <span>Av. da Liberdade, 110<br />1250-146 Lisboa</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-[#bf953f] shrink-0" />
              <a href="mailto:nash@dalpinheritage.com" className="hover:text-[#bf953f]">
                nash@dalpinheritage.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-[#bf953f] shrink-0" />
              <span>+351 934 032 320</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          © {new Date().getFullYear()} Dalpin Heritage Systems · Todos os
          direitos reservados
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
          Lisboa · Bruxelas · Frankfurt
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
