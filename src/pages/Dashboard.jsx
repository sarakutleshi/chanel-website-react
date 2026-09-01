import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocationForm from "../components/LocationForm.jsx";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2200&q=90"
          alt="CHANEL luxury jewelry collection"
          className="absolute inset-0 h-full w-full object-cover object-center animate-[heroZoom_12s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute left-0 right-0 top-0 z-20 border-b border-white/20">
          <div className="mx-auto flex h-12 max-w-[1600px] items-center justify-center px-6">
            <p className="text-[9px] uppercase tracking-[0.35em] text-white/90 md:text-[10px]">
              Discover the CHANEL Fall–Winter Collection
            </p>
          </div>
        </div>
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
          <p className="rotate-[-90deg] text-[9px] uppercase tracking-[0.45em] text-white/80">
            Maison CHANEL · Paris
          </p>
        </div>

        <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 md:block">
          <p className="rotate-90 text-[9px] uppercase tracking-[0.45em] text-white/80">
            Since 1910
          </p>
        </div>

        <div className="relative z-10 flex h-full items-end justify-center px-6 pb-24 text-center md:pb-28">
          <div className="max-w-4xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.5em] text-white/90 md:text-xs">
              CHANEL
            </p>

            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-[-0.02em] sm:text-6xl md:text-8xl lg:text-[110px]">
              The Art of <br /> <span className="italic">Elegance</span>
            </h1>

            <p className="mx-auto mt-7 max-w-lg text-xs font-light leading-6 tracking-[0.08em] text-white/90 sm:text-sm">
              A celebration of timeless beauty, exceptional craftsmanship and
              the spirit of Paris.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/signin"
                className="group relative min-w-[190px] overflow-hidden border border-white px-9 py-4 text-[10px] uppercase tracking-[0.3em]"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Discover
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/signin"
                className="group relative min-w-[190px] overflow-hidden bg-white px-9 py-4 text-[10px] uppercase tracking-[0.3em] text-black"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Explore Jewelry
                </span>
                <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-6 left-0 right-0 z-20 px-6">
          <div className="mx-auto flex max-w-[1600px] items-end justify-between">
            <div className="hidden md:block">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                Collection 2026
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/90">
                Fine Jewelry
              </p>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center gap-3">
                <span className="text-[8px] uppercase tracking-[0.35em] text-white/70">
                  Scroll
                </span>
                <span className="h-10 w-px bg-white/60" />
              </div>
            </div>
            <div className="ml-auto hidden text-right md:block">
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                Paris
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/90">
                Rue Cambon
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 md:hidden">
          <p className="text-[10px] uppercase tracking-[0.45em]">CHANEL</p>
        </div>
        <style>{` @keyframes heroZoom { from { transform: scale(1); } to { transform: scale(1.06); } } `}</style>
      </section>

      <section className="w-full bg-white px-6 py-24 md:px-16 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center md:grid-cols-2">
            {/* Image */}
            <div className="h-[450px] overflow-hidden md:h-[600px]">
              <img
                src="https://i.pinimg.com/1200x/eb/fe/45/ebfe457d38f58088d8ce5f389101c66b.jpg"
                alt="CHANEL jewelry"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Content */}
            <div className="flex min-h-[450px] items-center justify-center px-6 py-16 text-center md:min-h-[600px] md:px-16 lg:px-24">
              <div className="max-w-md">
                <p className="mb-5 text-[10px] uppercase tracking-[0.45em] text-neutral-500">
                  CHANEL
                </p>
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl lg:text-6xl">
                  Your World of <br />
                  <span className="italic">CHANEL</span>
                </h2>
                <p className="mt-7 text-sm leading-7 text-neutral-500">
                  Sign in to discover a more personal CHANEL experience. Save
                  your favorite creations, manage your account and explore
                  collections selected for you.
                </p>
                <Link
                  to="/signin"
                  className="mt-9 inline-block border border-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:bg-black hover:text-white"
                >
                  Sign In
                </Link>
                <div className="mt-7">
                  <p className="text-xs text-neutral-400">New to CHANEL?</p>
                  <Link
                    to="/register"
                    className="mt-2 inline-block text-[10px] uppercase tracking-[0.25em] underline underline-offset-4 transition-opacity hover:opacity-50"
                  >
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
