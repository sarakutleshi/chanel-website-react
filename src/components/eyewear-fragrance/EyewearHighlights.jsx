import { useState } from "react";

const highlights = [
  {
    img: "https://i.pinimg.com/736x/54/ba/c5/54bac512d94e7bff98a8bf7cd04d6017.jpg",
    label: "Highlights",
    title: "Métiers D'Art 2026 Eyewear Collection",
  },
  {
    img: "https://i.pinimg.com/736x/5c/d7/f3/5cd7f3088cd540a0ca1a587e296ecc10.jpg",
    label: "Highlights",
    title: "Spring Summer 2026 Collection",
  },
  {
    img: "https://i.pinimg.com/1200x/6e/a7/e1/6ea7e1ce9babdef8a4f8956392489921.jpg",
    label: "Highlights",
    title: "A Summer Feel",
  },
];

export default function EyewearHighlights() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full pt-14 pb-10 max-[560px]:pt-10 max-[560px]:pb-8">
      <h2 className="font-sans text-[1.3rem] font-bold uppercase tracking-[0.22em] text-center text-[var(--ink)] mb-10">
        Highlights
      </h2>

      <div className="grid grid-cols-3 gap-0">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-[600px] max-[900px]:h-[380px] max-[560px]:h-[320px]"
          >
            <img
              src={item.img}
              alt={item.title}
              className="block w-full h-full object-cover transition-transform duration-[550ms] ease-in-out hover:scale-[1.03]"
            />

            <div className='after:content-[""] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.08)_40%,transparent_70%)] after:pointer-events-none' />

            <div className="absolute bottom-6 left-6 z-10 text-[var(--white)]">
              <p className="block font-sans text-[0.58rem] font-semibold tracking-[0.2em] uppercase opacity-80 mb-[0.3rem]">
                {item.label}
              </p>

              <h3 className="font-sans text-[0.72rem] font-bold tracking-[0.1em] uppercase leading-[1.4] max-w-[22ch]">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {[0, 1].map((dot) => (
          <button
            key={dot}
            onClick={() => setActive(dot)}
            className={`h-2 w-2 rounded-full transition ${
              active === dot ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
