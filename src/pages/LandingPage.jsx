import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Navbar />

      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black text-white">
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=2200&q=90"
          alt="CHANEL luxury jewelry collection"
          className="absolute inset-0 h-full w-full object-cover object-center animate-[heroZoom_18s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/70" />

        <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center md:justify-center md:pb-0">
          <div className="fade-up max-w-3xl">
            <h1 className="font-serif text-[clamp(2.75rem,10vw,7.5rem)] font-light leading-none tracking-[0.18em]">
              CHANEL
            </h1>

            <p className="mt-5 font-serif text-xl font-light italic tracking-wide text-white/90 md:text-2xl">
              The art of elegance
            </p>

            <p className="mx-auto mt-5 max-w-md text-xs font-light leading-6 tracking-[0.06em] text-white/75 sm:text-sm">
              Timeless beauty, exceptional craftsmanship, and the spirit of
              Paris.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                to="/signin"
                className="group relative min-w-[180px] overflow-hidden border border-white px-9 py-3.5 text-[10px] uppercase tracking-[0.3em]"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                  Discover
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 group-hover:translate-x-0" />
              </Link>
              <Link
                to="/jewelry-watches"
                className="group relative min-w-[180px] overflow-hidden bg-white px-9 py-3.5 text-[10px] uppercase tracking-[0.3em] text-black"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Explore Jewelry
                </span>
                <span className="absolute inset-0 translate-y-full bg-black transition-transform duration-500 group-hover:translate-y-0" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[8px] uppercase tracking-[0.35em] text-white/55">
            Scroll
          </span>
          <span className="h-8 w-px origin-top animate-[scrollLine_2.2s_ease-in-out_infinite] bg-white/50" />
        </div>

        <style>{`
          @keyframes heroZoom {
            from { transform: scale(1); }
            to { transform: scale(1.05); }
          }
          @keyframes scrollLine {
            0%, 100% { transform: scaleY(1); opacity: 0.5; }
            50% { transform: scaleY(0.55); opacity: 1; }
          }
        `}</style>
      </section>

      <section className="w-full bg-neutral-50 px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-stretch md:grid-cols-2">
            <div className="h-[400px] overflow-hidden md:h-auto md:min-h-[560px]">
              <img
                src="https://i.pinimg.com/1200x/eb/fe/45/ebfe457d38f58088d8ce5f389101c66b.jpg"
                alt="CHANEL jewelry"
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-center justify-center bg-white px-6 py-16 text-center md:px-16 lg:px-24">
              <div className="max-w-md">
                <p className="mb-4 text-[10px] uppercase tracking-[0.45em] text-neutral-400">
                  Your account
                </p>
                <h2 className="font-serif text-4xl font-light leading-tight md:text-5xl">
                  Your world of{" "}
                  <span className="italic">CHANEL</span>
                </h2>
                <p className="mt-6 text-sm leading-7 text-neutral-500">
                  Sign in to discover a more personal CHANEL experience. Save
                  your favorite creations, manage your account and explore
                  collections selected for you.
                </p>
                <Link
                  to="/signin"
                  className="mt-9 inline-block border border-black px-10 py-3.5 text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 hover:bg-black hover:text-white"
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
