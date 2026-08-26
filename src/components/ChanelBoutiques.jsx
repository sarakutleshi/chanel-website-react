import chanelBuilding from "../assets/chanel-boutique.png";

function ChanelBoutiques() {
return (
<>
     <section className="bg-[#F9F9F9]">
            <div className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-between px-10 lg:px-20">
              {/* Left Side */}
              <div className="max-w-xl">
                <h2 className="mb-6 text-3xl font-semibold uppercase tracking-wide text-black">
                  Discover More in Chanel Boutiques
                </h2>
    
                <p className="mb-10 text-md leading-relaxed text-gray-700">
                  Our creations are thoughtfully curated by each of our boutiques.
                  To discover more, we invite you to find the boutique nearest you.
                </p>
    
                <button className="border-b border-black pb-1 text-xs font-semibold uppercase tracking-wide transition-all hover:opacity-60">
                  Find a Boutique
                </button>
              </div>
    
              {/* Right Side */}
              <div className="flex justify-center">
                <img
                  src={chanelBuilding}
                  alt="Chanel Boutique Illustration"
                  className="w-[550px] max-w-full object-contain mb-4 mt-4"
                />
              </div>
            </div>
          </section>    
</>
)
}
export default ChanelBoutiques;