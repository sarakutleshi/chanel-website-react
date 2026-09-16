import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Swiper from "swiper";
import "swiper/css";

const SLIDES = [
  {
    leftImg:  "https://i.pinimg.com/736x/e6/6c/45/e66c454d02c2fe056719f99eec6d96c9.jpg",
    rightImg: "https://i.pinimg.com/736x/c1/97/30/c19730fa348c88009e85d197612237f9.jpg",
    eyebrow:  "Fall–Winter 2024",
    titleA:   "A New",
    titleB:   "Collection.",
    chapter:  "Chapter I",
    body:     "The Fall–Winter 2024 collection arrives as a meditation on precision and freedom — structured silhouettes softened by the finest tweeds, reimagined for a woman who moves through the world on her own terms.",
    cta:      "Explore Fashion",
    href:     "/fashion",
  },
  {
    leftImg:  "https://i.pinimg.com/736x/f9/54/29/f95429c05bed0f0c378a9a65ee481684.jpg",
    rightImg: "https://i.pinimg.com/736x/98/20/10/982010f74d576ca208d5d30b80b4ceb5.jpg",
    eyebrow:  "Fine Jewelry",
    titleA:   "Timeless",
    titleB:   "Creations.",
    chapter:  "Chapter II",
    body:     "Every CHANEL jewelry piece is born in the ateliers of Paris, where jewelers and setters carry forward centuries of French craft tradition. Each creation is designed to endure — to be worn, loved, and passed on.",
    cta:      "Discover Jewelry",
    href:     "/jewelry-watches",
  },
  {
    leftImg:  "https://i.pinimg.com/1200x/75/bd/4f/75bd4f3f581c710af9da0a00cba5fc78.jpg",
    rightImg: "https://i.pinimg.com/736x/62/53/84/62538407aa186cb2820528b20df07d57.jpg",
    eyebrow:  "Beauty",
    titleA:   "The Art",
    titleB:   "Of Beauty.",
    chapter:  "Chapter III",
    body:     "From the iconic Rouge Allure to transformative serums cultivated from the camomille de Grasse — CHANEL beauty is rooted in the belief that elegance and science are not opposites, but partners.",
    cta:      "Discover Beauty",
    href:     "/makeup-skincare",
  },
];

export default function SplitSlider() {
  const containerRef = useRef(null); // outer div for height reference
  const swiperRef    = useRef(null); // swiper DOM element
  const instanceRef  = useRef(null); // Swiper instance

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      direction:   "vertical",
      loop:        false,
      grabCursor:  true,
      speed:       1000,
      parallax:    true,
      pagination:  { el: ".ss-pagination", clickable: true },
      // built-in mousewheel off — we handle it manually so we can release on last slide
      mousewheel:  false,
    });

    instanceRef.current = swiper;

    // Show "Continue ↓" hint when on last slide
    const hintEl = containerRef.current?.querySelector(".ss-scroll-hint");
    const updateHint = () => {
      if (!hintEl) return;
      hintEl.style.opacity = swiper.activeIndex === SLIDES.length - 1 ? "1" : "0";
    };
    swiper.on("slideChange", updateHint);

    let wheelCooldown = false;
    // How long (ms) the user must dwell on the last slide before scroll releases to page
    const DWELL_MS = 1600;
    let lastSlideReady = false;      // becomes true after dwell timer fires
    let dwellTimer     = null;

    // When Swiper lands on the last slide, start the dwell timer
    swiper.on("slideChange", () => {
      const isLast = swiper.activeIndex === SLIDES.length - 1;
      if (isLast) {
        lastSlideReady = false;
        clearTimeout(dwellTimer);
        dwellTimer = setTimeout(() => { lastSlideReady = true; }, DWELL_MS);
      } else {
        lastSlideReady = false;
        clearTimeout(dwellTimer);
      }
    });

    const onWheel = (e) => {
      const el = containerRef.current;
      if (!el) return;

      // Only intercept when the pointer is inside the slider
      const { left, right, top, bottom } = el.getBoundingClientRect();
      const inside =
        e.clientX >= left && e.clientX <= right &&
        e.clientY >= top  && e.clientY <= bottom;

      if (!inside) return;

      const goingDown = e.deltaY > 0;
      const isFirst   = swiper.activeIndex === 0;
      const isLast    = swiper.activeIndex === SLIDES.length - 1;

      // Allow page scroll up from first slide
      if (isFirst && !goingDown) return;

      // On the last slide scrolling down: only release after dwell period
      if (isLast && goingDown) {
        if (lastSlideReady) return; // let the event through → page scrolls
        // Still in dwell period — eat the event so slide 3 stays visible
        e.preventDefault();
        return;
      }

      // Mid-slides: eat event and change slide
      e.preventDefault();
      if (wheelCooldown) return;

      goingDown ? swiper.slideNext() : swiper.slidePrev();

      wheelCooldown = true;
      setTimeout(() => { wheelCooldown = false; }, 900);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      clearTimeout(dwellTimer);
      swiper.destroy(true, true);
      instanceRef.current = null;
    };
  }, []);

  return (
    <>
      {/* Full-viewport wrapper — no padding, no centering container */}
      <div
        ref={containerRef}
        className="relative h-[580px] w-screen overflow-hidden p-10"
      >
        <div ref={swiperRef} className="swiper h-full w-full">
          <div className="swiper-wrapper">
            {SLIDES.map((s, i) => (
              <div
                key={i}
                className="swiper-slide flex !h-full overflow-hidden"
              >
                {/* ── LEFT panel ── */}
                <div
                  className="ss-left relative w-1/2 overflow-hidden"
                  data-swiper-parallax-y="-20%"
                >
                  <div
                    className="ss-left-img absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.leftImg})` }}
                  />
                  <div className="absolute inset-0 bg-black/35" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-10 md:p-16">
                    <p className="ss-eyebrow text-[10px] uppercase tracking-[0.45em] text-white/55">
                      {s.eyebrow}
                    </p>

                    <div className="ss-headline">
                      <h2 className="font-serif text-5xl font-light leading-[0.95] text-white md:text-6xl lg:text-7xl">
                        {s.titleA}
                        <br />
                        <em className="font-serif italic">{s.titleB}</em>
                      </h2>
                    </div>

                    <div className="ss-footer flex items-end justify-between">
                      <p className="text-[11px] uppercase tracking-[0.3em] text-white/35">
                        {s.chapter}
                      </p>
                      <NavLink
                        to={s.href}
                        onClick={(e) => e.stopPropagation()}
                        className="border-b border-white/40 pb-0.5 text-[10px] uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white hover:text-white"
                      >
                        {s.cta} →
                      </NavLink>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT panel ── */}
                <div
                  className="ss-right relative w-1/2 overflow-hidden"
                  data-swiper-parallax-y="35%"
                >
                  <div
                    className="ss-right-img absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${s.rightImg})` }}
                  />
                  <div className="absolute inset-0 bg-black/55" />

                  <div className="relative z-10 flex h-full items-center justify-center p-10 md:p-16">
                    <p className="ss-body max-w-xs font-serif text-lg font-light leading-8 text-white/80 md:text-xl">
                      {s.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots — right edge, vertically centred */}
          <div className="ss-pagination swiper-pagination !left-auto !right-6 !w-auto" />
        </div>

        {/* Scroll-down hint on last slide */}
        <div className="ss-scroll-hint absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 transition-opacity duration-500">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Continue</span>
          <span className="h-8 w-px bg-white/40" />
        </div>
      </div>
    </>
  );
}


