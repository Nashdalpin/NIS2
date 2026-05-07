import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LegalLayout = ({ title, lastUpdate, children }) => (
  <div className="min-h-screen bg-[#050505] text-white">
    <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
      <div className="max-w-3xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="w-9 h-9 border border-[#bf953f] flex items-center justify-center">
            <span className="font-cinzel text-[10px] tracking-[0.1em] text-[#bf953f]">DHS</span>
          </span>
          <span className="hidden sm:block font-cinzel text-[11px] md:text-xs tracking-[0.35em] text-white">
            DALPIN HERITAGE SYSTEMS
          </span>
        </Link>
        <Link
          to="/"
          className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-[#bf953f] inline-flex items-center gap-2"
        >
          <ArrowLeft size={12} />
          Voltar
        </Link>
      </div>
    </header>
    <main className="max-w-3xl mx-auto px-6 lg:px-10 py-20">
      <p className="micro-label text-[9px] mb-4">Documento Legal</p>
      <h1 className="font-cinzel text-4xl md:text-5xl leading-tight mb-4">{title}</h1>
      <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12">
        Última actualização: {lastUpdate}
      </p>
      <div className="prose prose-invert max-w-none">{children}</div>
    </main>
  </div>
);

const Section = ({ children, title }) => (
  <section className="mb-10">
    <h2 className="font-cinzel text-xl md:text-2xl text-white mb-4 mt-12">{title}</h2>
    <div className="font-outfit text-white/70 text-base leading-relaxed space-y-4">
      {children}
    </div>
  </section>
);

export default LegalLayout;
export { Section };
