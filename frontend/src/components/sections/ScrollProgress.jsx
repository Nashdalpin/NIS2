import { useEffect, useState } from "react";

export const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setPct(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      data-testid="scroll-progress"
      className="fixed top-0 left-0 right-0 h-px z-[60] pointer-events-none"
    >
      <div
        className="h-full bg-[#bf953f] transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%`, boxShadow: "0 0 8px rgba(191,149,63,0.6)" }}
      />
    </div>
  );
};

export default ScrollProgress;
