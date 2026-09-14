import { useEffect, useRef } from "react";


export default function HorizontalScrollSection({
  items = [],
  eyebrow = "The Collection",
  title = "Looks",
  subtitle = "Scroll to explore the runway",
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !items.length) return;

    const supportsScrollTimeline =
      typeof CSS !== "undefined" &&
      (CSS.supports?.("animation-timeline", "scroll()") ||
        CSS.supports?.("view-timeline-name", "--x"));

    if (supportsScrollTimeline) return undefined;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(
        1,
        Math.max(0, -rect.top / scrollable),
      );

      const maxTranslate = track.scrollWidth - window.innerWidth;
      track.style.transform = `translate3d(${-maxTranslate * progress}px, 0, 0)`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      id="looks"
      className="fashion-hs"
      aria-label="Runway looks"
    >
      <div className="fashion-hs__sticky">
        <div ref={trackRef} className="fashion-hs__track">
          {/* Intro panel */}
          <div className="fashion-hs__panel fashion-hs__panel--intro">
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/60">
              {eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-5xl font-light tracking-wide text-white md:text-7xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xs font-serif text-lg italic leading-relaxed text-white/70 md:text-xl">
              {subtitle}
            </p>
            <div className="mt-10 flex items-center gap-3 text-white/50">
              <span className="h-px w-10 bg-white/40" />
              <span className="text-[8px] uppercase tracking-[0.2em]">
                Scroll
              </span>
            </div>
          </div>

          {items.map((item, i) => (
            <div key={`${item.label}-${i}`} className="fashion-hs__panel">
              <div className="fashion-hs__media">
                <img src={item.src} alt={item.label} draggable="false" />
                <div className="fashion-hs__caption">
                  <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/80">
                    {item.label}
                  </span>
                  <span className="text-[9px] tracking-[0.16em] text-white/45">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
