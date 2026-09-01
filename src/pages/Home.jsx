import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-[80vh] overflow-hidden bg-neutral-100">
        <img
          src="https://i.pinimg.com/736x/4b/f8/a4/4bf8a4698481022fc097df6751c5ea1c.jpg"
          alt="Chanel fashion collection"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex min-h-[80vh] items-end px-6 pb-16 md:px-16 md:pb-20">
          <div className="max-w-xl text-white">
            <p className="mb-4 text-xs uppercase tracking-[0.35em]">
              The Collection
            </p>

            <h1 className="text-4xl font-light tracking-wide md:text-6xl">
              Timeless Elegance
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/90">
              Discover the latest creations, designed with the unmistakable
              spirit of Chanel.
            </p>

            <NavLink
              to="/fashion"
              className="mt-8 inline-block border border-white px-8 py-4 text-xs uppercase tracking-[0.25em] transition hover:bg-white hover:text-black"
            >
              Discover Fashion
            </NavLink>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-neutral-500">
            CHANEL
          </p>

          <h2 className="text-3xl font-light tracking-wide md:text-5xl">
            A world of creation
          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-neutral-600">
            Explore the world of Chanel through fashion, beauty, jewelry,
            watches, eyewear and fragrance. Each creation reflects a unique
            combination of heritage, craftsmanship and contemporary elegance.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 md:px-16 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              Explore
            </p>

            <h2 className="text-3xl font-light tracking-wide">
              Discover Chanel
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <NavLink
              to="/fashion"
              className="group relative h-[500px] overflow-hidden"
            >
              <img
                src="https://i.pinimg.com/736x/7c/ce/9d/7cce9dcebc3bc4361a246fc391f7464d.jpg"
                alt="Fashion"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">Fashion</p>

                <h3 className="mt-2 text-2xl font-light">Collections</h3>
              </div>
            </NavLink>

            <NavLink
              to="/jewelry-watches"
              className="group relative h-[500px] overflow-hidden"
            >
              <img
                src="https://i.pinimg.com/736x/3c/81/b0/3c81b0fd00da8b3f178b673047e36dc4.jpg"
                alt="Jewelry"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">
                  Jewelry &amp; Watches
                </p>

                <h3 className="mt-2 text-2xl font-light">Timeless Pieces</h3>
              </div>
            </NavLink>

            <NavLink
              to="/makeup-skincare"
              className="group relative h-[500px] overflow-hidden"
            >
              <img
                src="https://i.pinimg.com/vwebp/1200x/ab/f1/7a/abf17a75d816ea25ce85649b557b46a1.webp"
                alt="Makeup and skincare"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">
                  Makeup &amp; Skincare
                </p>

                <h3 className="mt-2 text-2xl font-light">Beauty</h3>
              </div>
            </NavLink>

            <NavLink
              to="/eyewear-fragrance"
              className="group relative h-[500px] overflow-hidden"
            >
              <img
                src="https://i.pinimg.com/736x/86/81/a8/8681a8244aaffbe534d40e0cb1370db2.jpg"
                alt="Fragrance"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />

              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs uppercase tracking-[0.3em]">
                  Eyewear &amp; Fragrance
                </p>

                <h3 className="mt-2 text-2xl font-light">Signature Scents</h3>
              </div>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
              The House
            </p>

            <h2 className="text-3xl font-light tracking-wide md:text-5xl">
              The spirit of Chanel
            </h2>

            <p className="mt-7 text-sm leading-8 text-neutral-600">
              Discover the heritage and vision that continue to inspire the
              House of Chanel. From iconic fashion creations to exceptional
              beauty and jewelry, each collection carries its own story.
            </p>

            <NavLink
              to="/about"
              className="mt-8 inline-block border-b border-black pb-2 text-xs uppercase tracking-[0.25em]"
            >
              Discover the House
            </NavLink>
          </div>

          <div className="h-[500px] overflow-hidden">
            <img
              src="https://www.therow.com/cdn/shop/files/000568680003_v2_b90ddb36-4cb6-41e1-98ef-07febcdf3cef.jpg?v=1739561831"
              alt="Chanel collection"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                Inspiration
              </p>

              <h2 className="text-3xl font-light tracking-wide">Galerie</h2>
            </div>

            <NavLink
              to="/galerie"
              className="hidden border-b border-black pb-1 text-xs uppercase tracking-[0.2em] md:block"
            >
              View Galerie
            </NavLink>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <img
              src="https://i.pinimg.com/vwebp/1200x/04/54/1a/04541a75ccefcac6a2b5a95b3ca9e7ea.webp"
              alt="Chanel editorial"
              className="h-72 w-full object-cover"
            />

            <img
              src="https://i.pinimg.com/736x/06/fb/8d/06fb8d53472c9ba1f4db5f0a1bee386f.jpg"
              alt="Fashion editorial"
              className="h-72 w-full object-cover"
            />
            <img
              src="https://a.1stdibscdn.com/chanel-vintage-s-s-1988-white-black-lace-camellia-bow-dress-gown-for-sale-picture-6/v_32222/v_256057721741135017454/chanel_vintage_spring_1988_white_black_lace_camellia_bow_dress_gown_3_master.jpg?disable=upscale&auto=webp&quality=60&width=1400"
              alt="Fashion style"
              className="h-72 w-full object-cover"
            />
            <img
              src="https://i.pinimg.com/vwebp/736x/d5/5b/16/d55b167415f548b264b54dd59c6fc574.webp"
              alt="Fashion collection"
              className="h-72 w-full object-cover"
            />
          </div>

          <NavLink
            to="/galerie"
            className="mt-8 block text-center text-xs uppercase tracking-[0.2em] underline underline-offset-8 md:hidden"
          >
            View Galerie
          </NavLink>
        </div>
      </section>

      <section className="border-t border-neutral-200 px-6 py-24 text-center md:py-32">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
          Discover More
        </p>

        <h2 className="text-3xl font-light tracking-wide md:text-5xl">
          Enter the world of Chanel
        </h2>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <NavLink
            to="/fashion"
            className="border border-black px-8 py-4 text-xs uppercase tracking-[0.2em] transition hover:bg-black hover:text-white"
          >
            Explore Fashion
          </NavLink>

          <NavLink
            to="/about"
            className="border border-neutral-300 px-8 py-4 text-xs uppercase tracking-[0.2em] transition hover:border-black"
          >
            About Chanel
          </NavLink>
        </div>
      </section>

      <Footer />
    </>
  );
}
