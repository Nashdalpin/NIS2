import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "dalpin_cookie_consent";

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(KEY, "accepted");
    setVisible(false);
  };
  const reject = () => {
    localStorage.setItem(KEY, "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      data-testid="cookie-consent"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-[80] bg-[#0a0a0a] border border-[#bf953f]/30 p-6 shadow-2xl"
    >
      <button
        onClick={reject}
        aria-label="Fechar"
        className="absolute top-3 right-3 text-white/40 hover:text-white"
      >
        <X size={16} />
      </button>
      <p className="micro-label text-[9px] mb-3">RGPD · Privacidade</p>
      <p className="font-outfit text-white/70 text-sm leading-relaxed mb-5">
        Utilizamos cookies essenciais e analíticos anonimizados para melhorar a
        sua experiência e medir o desempenho do site. Os seus dados nunca são
        partilhados.
      </p>
      <div className="flex gap-3">
        <button
          onClick={accept}
          data-testid="cookie-accept"
          className="flex-1 bg-[#bf953f] text-black text-[10px] uppercase tracking-[0.3em] font-bold py-3 hover:bg-white transition-colors"
        >
          Aceitar
        </button>
        <button
          onClick={reject}
          data-testid="cookie-reject"
          className="flex-1 border border-white/15 text-white/70 text-[10px] uppercase tracking-[0.3em] font-bold py-3 hover:border-[#bf953f] hover:text-[#bf953f] transition-colors"
        >
          Apenas Essenciais
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
