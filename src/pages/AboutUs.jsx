import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import React from "react";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart";
import LocationForm from "../components/LocationForm.jsx";
import ReverseScroll from "../components/ReverseScroll";

const images = {
  first:
    "https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831",

  second:
    "https://www.therow.com/cdn/shop/files/040_042_4aa03605-567e-44c3-813b-65fc7b71fec9.jpg?v=1739562544",

  third:
    "https://i.pinimg.com/1200x/e7/d1/6a/e7d16ae63f26a947245f04f0ff64593b.jpg",
};

const history = [
  {
    src: "https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831",
    type: "DIGITAL PRESENCE",
    title: "CHANEL.COM",
    description:
      "Our website, chanel.com, serves as a significant point of contact for our Brand to the wider world." +
      "As we continue to grow our digital media presence, our Global Digital Services team works across Chanel's digital sites to accelerate progress by embedding sustainability from the start." +
      "We worked closely with partners to reduce the weight of chanel.com webpages by 55%, making them 30% faster to load — driving a 16% reduction in emissions despite an almost 28% increase in traffic in 2022.",
  },
  {
    src: "https://www.therow.com/cdn/shop/files/040_042_4aa03605-567e-44c3-813b-65fc7b71fec9.jpg?v=1739562544",
    type: "OUR STORES",
    title: "Store Layout",
    description:
      "The Chanel is dedicated to creating collections that embody timeless elegance and exceptional craftsmanship." +
      " Every garment is designed with precision, using the finest materials and an uncompromising attention to detail." +
      " Our commitment to refined simplicity and enduring quality allows each piece to transcend seasons, offering a modern luxury wardrobe built to last.",
  },
  {
    src: "https://i.pinimg.com/1200x/e7/d1/6a/e7d16ae63f26a947245f04f0ff64593b.jpg",
    type: "MATERIALS",
    title: "EXCEPTIONAL FABRICS",
    description:
      "Every creation begins with carefully selected materials chosen for their quality, texture, and longevity." +
      " From luxurious cashmere and fine wool to premium cotton and silk, each fabric is sourced to meet the highest standards of craftsmanship." +
      " By investing in exceptional materials, we create garments that feel effortless, endure over time, and embody understated luxury.",
  },
];

export default function AboutUs() {
  return (
    <main className="bg-[#f7f6f2] text-[#111]">
      <Navbar />
      {/* HERO */}
      <section className="px-4 pt-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-7 flex items-center justify-between">
            <p className="text-[9px] uppercase tracking-[0.28em] text-neutral-500">
              About the house
            </p>

            <p className="text-[9px] uppercase tracking-[0.25em] text-neutral-400">
              Our story
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <h1 className="text-[clamp(3rem,6vw,6.5rem)] font-light leading-[0.88] tracking-[-0.045em]">
                A world
                <br />
                shaped by
                <br />
                simplicity.
              </h1>
            </div>

            <div className="pb-1 md:col-span-3 md:col-start-10">
              <p className="text-[12px] leading-5 text-neutral-600">
                We create with a belief that beauty does not need to be loud. It
                can exist in proportion, texture, movement and the quiet details
                that reveal themselves over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="px-4 pt-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
            <img
              src={images.second}
              alt="The world of the house"
              className="h-full w-full object-cover"
            />

            <div className="absolute bottom-4 left-4">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white">
                01 — The world
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-4 py-12 md:px-6 md:py-14 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-8 md:grid-cols-12">
            {/* LEFT */}
            <div className="md:col-span-2">
              <p className="mt-1 text-md uppercase tracking-[0.1em] text-neutral-600">
                Who we are
              </p>
            </div>

            {/* RIGHT */}
            <div className="md:col-span-9">
              <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
                We believe in creating a world where design, quality and
                individuality come together naturally.
              </h2>

              <div className="mt-7 grid gap-8 md:grid-cols-2">
                <div>
                  <p className="text-[12px] leading-6 text-neutral-600">
                    Our approach begins with observation. We look at the spaces
                    around us, the objects we live with and the way people move
                    through the world. These small observations influence
                    everything we create, from the proportions of a garment to
                    the smallest details of an object.
                  </p>

                  <p className="mt-4 text-[12px] leading-4 text-neutral-600">
                    Rather than following every new direction, we are interested
                    in developing a point of view that can exist beyond a
                    particular season or moment. Our work is guided by the
                    belief that good design should feel relevant today while
                    retaining the ability to remain meaningful years from now.
                  </p>

                  <p className="mt-4 text-[12px] leading-4 text-neutral-600">
                    We value restraint, not as a limitation, but as a way of
                    allowing the essential qualities of a piece to become clear.
                    Every decision is made with intention, creating designs that
                    feel quiet, confident and considered.
                  </p>
                </div>

                <div>
                  <p className="text-[12px] leading-4 text-neutral-600">
                    Materials, proportion and craftsmanship are central to our
                    process. We believe that an object should feel as considered
                    from a distance as it does when experienced up close. The
                    relationship between texture, structure and movement is
                    carefully explored throughout the creative process.
                  </p>

                  <p className="mt-4 text-[12px] leading-4 text-neutral-600">
                    We work with an appreciation for the people behind every
                    detail. Craftsmanship is not simply a technique, but a
                    dialogue between material, time and the individual creating
                    it. This attention gives each piece a sense of character
                    without unnecessary decoration.
                  </p>

                  <p className="mt-4 text-[12px] leading-4 text-neutral-600">
                    The result is a language that is understated but
                    recognizable, refined without becoming distant, and
                    contemporary without losing its sense of permanence. We
                    create with the intention of making pieces that become part
                    of everyday life rather than simply occupying a moment in
                    it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReverseScroll />

      <EditorialCart {...history[1]} />

      {/* PHILOSOPHY */}
      <section className="px-4 py-12 md:px-6 md:py-14 lg:px-8">

        
        <div className="mx-auto max-w-[1200px] border-y border-neutral-300 py-10">
          <div className="grid items-start gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="mt-1 text-md uppercase tracking-[0.1em] text-neutral-600">
                Our philosophy
              </p>
            </div>

            <div className="md:col-span-9">
              <h2 className="text-2xl font-light tracking-[-0.02em] md:text-3xl">
                We choose longevity over excess, character over decoration, and
                intention over noise.
              </h2>

              <div className="mt-7 grid gap-6 text-[12px] leading-6 text-neutral-600 md:grid-cols-2">
                <p>
                  Fashion and design have always been connected to culture,
                  movement and identity. We see our role as contributing to that
                  conversation while maintaining a clear and personal
                  perspective.
                </p>

                <p>
                  Our goal is not simply to create something beautiful for
                  today. It is to create something that can remain meaningful
                  tomorrow, gaining character through time and experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocationForm />

      {/* FINAL STATEMENT */}
      <section className="px-4 py-16 md:px-6 md:py-20 lg:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400">
            The house
          </p>

          <h2 className="mt-5 text-4xl font-light leading-[0.95] tracking-[-0.035em] md:text-5xl">
            Made to be experienced.
            <br />
            Designed to remain.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[12px] leading-6 text-neutral-500">
            This is more than an aesthetic. It is a way of thinking about
            design, quality and the relationship between the things we create
            and the people who experience them.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
