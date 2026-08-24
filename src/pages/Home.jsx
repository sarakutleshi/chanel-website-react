import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HeroPicture from "../assets/jewerly-hero.png";


export default function Home() {
  return (
    <>
      <Navbar />

      <HeroSection
        src="https://i.pinimg.com/736x/f1/6b/2c/f16b2c7dbcff76a89346e1cb02fa555f.jpg"
        uppertitle="The Art of Being Unique"
        title="CHANEL"
        description="Discover the world of CHANEL, where timeless elegance meets modern innovation. Explore our collections and experience the essence of luxury."
        buttonText="Explore Collections"
        href="/fashion"
      />
      <HeroSection
        src="https://i.pinimg.com/1200x/e0/ab/54/e0ab54fafad4cb22401ee5d11f1069d7.jpg"
        uppertitle="The Art of Being Unique"
        title="Make-Up & Skincare"
        description="Unleash your inner artist, from subtle enhancements to bold statements, discover the confidence that comes with every stroke of color."
        buttonText="Explore Collections"
        href="/makeup-skincare"
      />
      <HeroSection
        src="https://i.pinimg.com/1200x/b1/90/1a/b1901ab6625a3917bd21cbb81be5ec8c.jpg"
        uppertitle="Haute Couture"
        title="FASHION"
        buttonText="Explore Collections"
        href="/fashion"
      />

      <HeroSection
        src={HeroPicture}
        uppertitle="The Art of Being Unique"
        title="Jewerlry & Watches"
        description="Discover the world of CHANEL, where timeless elegance meets modern innovation. Explore our collections and experience the essence of luxury."
        buttonText="Explore Collections"
        href="/jewelry-watches"
      />

      <HeroSection
        src="https://i.pinimg.com/736x/3a/ca/33/3aca335c3b3da3e01d3ba2591d0ed856.jpg"
        uppertitle="The Art of Being Unique"
        title="Eyewear & Fragrance"
        description="Discover the world of CHANEL, where timeless elegance meets modern innovation. Explore our collections and experience the essence of luxury."
        buttonText="Explore Collections"
        href="/eyewear-fragrance"
      />

      <div className="m-[20px] h-[150px] mt-[5rem] mb-[3rem] font-serif italic text-[1.5rem] leading-[1.4] text-[var(--ink)] mx-auto  text-center max-w-[var(--max)]">
        <blockquote className="mb-[1rem] flex justify-center text-center">
          &quot;Fashion fades, only style remains the same.&quot;
        </blockquote>
        <p>— Gabrielle Chanel</p>
      </div>

      <Footer />
    </>
  );
}
