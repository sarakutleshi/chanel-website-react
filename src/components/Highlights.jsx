import { useEffect, useRef, useState } from "react";

export default function Highlights({ highlights = [] }) {
  const sliderRef = useRef(null);

  const [active, setActive] = useState(0);

  // Dragging
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  // Prevent auto-scroll immediately after dragging
  const dragTimeout = useRef(null);

  /*
   * --------------------------------------------------
   * CONTINUOUS AUTO SCROLL
   * --------------------------------------------------
   */
  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider || highlights.length <= 1) return;

    let animationFrame;
    let lastTime = performance.now();

    // Change this number to control speed
    // Higher = faster
    const speed = 0.035;

    const animate = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isDragging.current) {
        slider.scrollLeft += speed * delta;

        /*
         * Because the cards are duplicated,
         * reset after the first set.
         */
        const firstCard = slider.querySelector("[data-card]");

        if (firstCard) {
          const cardWidth = firstCard.offsetWidth;

          if (slider.scrollLeft >= cardWidth * highlights.length) {
            slider.scrollLeft -= cardWidth * highlights.length;
          }
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [highlights]);

  /*
   * --------------------------------------------------
   * UPDATE ACTIVE DOT
   * --------------------------------------------------
   */
  const handleScroll = () => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.querySelectorAll("[data-card]");

    if (!cards.length) return;

    const cardWidth = cards[0].offsetWidth;

    if (!cardWidth) return;

    let index = Math.round(slider.scrollLeft / cardWidth);

    index = index % highlights.length;

    setActive(index);
  };

  /*
   * --------------------------------------------------
   * MOUSE DOWN
   * --------------------------------------------------
   */
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;

    isDragging.current = true;

    startX.current = e.pageX - sliderRef.current.offsetLeft;

    scrollStart.current = sliderRef.current.scrollLeft;

    clearTimeout(dragTimeout.current);
  };

  /*
   * --------------------------------------------------
   * MOUSE MOVE
   * --------------------------------------------------
   */
  const handleMouseMove = (e) => {
    if (!isDragging.current || !sliderRef.current) return;

    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;

    const distance = (x - startX.current) * 1.2;

    sliderRef.current.scrollLeft = scrollStart.current - distance;
  };

  /*
   * --------------------------------------------------
   * STOP DRAGGING
   * --------------------------------------------------
   */
  const stopDragging = () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    /*
     * Give the carousel a short moment before
     * automatic scrolling starts again.
     */
    dragTimeout.current = setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.scrollBehavior = "auto";
      }
    }, 100);
  };

  /*
   * --------------------------------------------------
   * DOT CLICK
   * --------------------------------------------------
   */
  const goToSlide = (index) => {
    if (!sliderRef.current) return;

    const slider = sliderRef.current;
    const cards = slider.querySelectorAll("[data-card]");

    if (!cards[index]) return;

    const cardWidth = cards[0].offsetWidth;

    isDragging.current = true;

    slider.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });

    setActive(index);

    setTimeout(() => {
      isDragging.current = false;
    }, 700);
  };

  /*
   * --------------------------------------------------
   * EMPTY STATE
   * --------------------------------------------------
   */
  if (!highlights.length) {
    return null;
  }

  /*
   * Duplicate cards so the carousel can loop
   * continuously without an obvious jump.
   */
  const duplicatedHighlights = [...highlights, ...highlights];

  return (
    <section className="w-full py-12 md:py-14">
      {/* -------------------------------------------
          HEADER
      -------------------------------------------- */}
      <div className="px-6 pb-10 md:px-10 md:pb-14">
        <div className="text-center">
          <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-neutral-500">
            Discover
          </p>

          <h2 className="text-2xl font-light md:text-3xl">Highlights</h2>
        </div>
      </div>

      {/* -------------------------------------------
          CAROUSEL
      -------------------------------------------- */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="flex w-full cursor-grab overflow-x-auto select-none active:cursor-grabbing"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {duplicatedHighlights.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            data-card
            className="
              group
              relative
              h-[500px]
              min-w-[60vw]
              overflow-hidden
              md:min-w-[48vw]
              lg:min-w-[32vw]
          "
          >
            {/* IMAGE */}
            <img
              src={item.img}
              alt={item.title}
              draggable="false"
              className="
                block
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.03]
              "
            />

            {/* GRADIENT */}
            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-t
                from-black/55
                via-black/10
                to-transparent
              "
            />

            {/* TEXT */}
            <div
              className="
                pointer-events-none
                absolute
                bottom-6
                left-6
                z-10
                text-white
                md:bottom-8
                md:left-8
              "
            >
              <p
                className="
                  mb-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  opacity-80
                "
              >
                {item.label}
              </p>

              <h3
                className="
                  max-w-[22ch]
                  text-sm
                  font-bold
                  uppercase
                  leading-[1.4]
                  tracking-[0.1em]
                "
              >
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
