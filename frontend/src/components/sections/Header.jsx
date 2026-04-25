import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#metodologia", label: "Metodologia" },
  { href: "#riscos", label: "Riscos" },
  { href: "#testemunhos", label: "Testemunhos" },
  { href: "#faq", label: "FAQ" },
  { href: "#captura", label: "Contacto" },
];

export const Header = ({ onPriorityClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        <a
          href="#top"
          data-testid="logo-link"
          className="flex items-center gap-3 group"
        >
          <span className="w-8 h-8 border border-[#bf953f] flex items-center justify-center">
            <span className="block w-2 h-2 bg-[#bf953f] group-hover:scale-150 transition-transform" />
          </span>
          <span className="font-cinzel text-base tracking-[0.35em] text-white">
            DALPIN
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.3em] text-white/60 hover:text-[#bf953f] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          onClick={onPriorityClick}
          data-testid="header-priority-cta"
          className="hidden md:inline-flex items-center text-[11px] uppercase tracking-[0.25em] text-black bg-[#bf953f] hover:bg-white px-6 py-3 transition-all"
        >
          Priority Audit
        </button>

        <button
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
          className="lg:hidden text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-xs uppercase tracking-[0.3em] text-white/70 hover:text-[#bf953f]"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onPriorityClick?.();
              }}
              className="mt-2 text-[11px] uppercase tracking-[0.25em] text-black bg-[#bf953f] px-6 py-3"
            >
              Priority Audit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
