import { useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import WarningMarquee from "@/components/sections/WarningMarquee";
import TrustStrip from "@/components/sections/TrustStrip";
import Methodology from "@/components/sections/Methodology";
import Countdown from "@/components/sections/Countdown";
import Risks from "@/components/sections/Risks";
import RiskCalculator from "@/components/sections/RiskCalculator";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LeadCapture from "@/components/sections/LeadCapture";
import PriorityModal from "@/components/sections/PriorityModal";
import Footer from "@/components/sections/Footer";
import ScrollProgress from "@/components/sections/ScrollProgress";
import CookieConsent from "@/components/sections/CookieConsent";
import FadeIn from "@/components/sections/FadeIn";
import Admin from "@/pages/Admin";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Cookies from "@/pages/Cookies";

const Landing = () => {
  const [priorityOpen, setPriorityOpen] = useState(false);

  const scrollNext = () => {
    document
      .getElementById("metodologia")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen">
      <ScrollProgress />
      <Header onPriorityClick={() => setPriorityOpen(true)} />
      <main>
        <Hero
          onScrollDown={scrollNext}
          onPriorityClick={() => setPriorityOpen(true)}
        />
        <WarningMarquee />
        <FadeIn>
          <TrustStrip />
        </FadeIn>
        <FadeIn>
          <Methodology />
        </FadeIn>
        <FadeIn>
          <Countdown />
        </FadeIn>
        <FadeIn>
          <Risks />
        </FadeIn>
        <FadeIn>
          <RiskCalculator
            onPriorityClick={() => setPriorityOpen(true)}
          />
        </FadeIn>
        <FadeIn>
          <Testimonials />
        </FadeIn>
        <FadeIn>
          <FAQ />
        </FadeIn>
        <FadeIn>
          <LeadCapture />
        </FadeIn>
      </main>
      <Footer />
      <PriorityModal
        open={priorityOpen}
        onClose={() => setPriorityOpen(false)}
      />
      <CookieConsent />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0a0a0a",
            border: "1px solid rgba(191,149,63,0.4)",
            color: "#fff",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/termos" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
