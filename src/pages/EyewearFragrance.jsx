import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCarousel from "../components/eyewear-fragrance/ProductCarousel";
import EyewearHighlights from "../components/eyewear-fragrance/EyewearHighlights";
import fragranceProducts from "../data/fragrance-product";
import eyewearProducts from "../data/eyewear-product";
import HeroSection from "../components/eyewear-fragrance/HeroSection";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart";

const data = [
  {
    src: "https://i.pinimg.com/vwebp/1200x/c9/ee/8f/c9ee8f2e6ab43c614f4eb02a4fc02812.webp",
    uppertitle: "Collection 2025/2026",
    title: "Eyewear",
    description:
      "Adorned with heart charms, the frames of the CHANEL eyewear collection highlight a feminine and elegant look.",
    buttonText: "Explore Collection",
    href: "#eyewear-products",
  },
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_autoplus/1773007539357-header-kem-summer-26_1260x2880.jpg",
    uppertitle: " Collection 2026",
    title: " Explore Collection",
    buttonText: "Explore Collection",
    description: "",
    href: "#fragrance-products",
  },
];

const editorial = [
  {
    src: "https://www.chanel.com/puls-img/c_limit,w_1920/q_auto:good,dpr_auto,f_auto/1780588706283-vl-kem-summer-2026-les-eaux-3-dotcom-edito-push_2596x1948.jpg",
    type: "Fragrance",
    title: "Les Eaux de Chanel",
    description:
      "Six scented getaways inspired by destinations that were close to Gabrielle Chanel's heart.",
    href: "#fragrance-products",
    linkText: "Discover",
  },
  {
    src: "https://www.chanel.com/puls-img/1782741509479-vl-kem-summer-2026-chance-dotcom-edito-push.jpg",
    type: "Fragrance",
    title: "Chance Eau Splendide",
    description:
      "A radiant fruity-floral fragrance blending raspberry, rose geranium and cedar white musk.",
    href: "#fragrance-products",
    linkText: "Discover",
  },
];

export default function EyewearFragrance() {
  return (
    <>
      <Navbar />

      <HeroSection {...data[0]} />
      <EyewearHighlights />

      <ProductCarousel
        title="Eyewear Selection"
        products={eyewearProducts}
        sectionId="eyewear-products"
        backPath="/eyewear-fragrance"
        backLabel="Eyewear & Fragrance"
      />

      <HeroSection {...data[1]} />

      <EditorialCart {...editorial[0]} />
      <EditorialCart {...editorial[1]} reverse />

      <ProductCarousel
        title="Fragrance Selection"
        products={fragranceProducts}
        sectionId="fragrance-products"
        backPath="/eyewear-fragrance"
        backLabel="Eyewear & Fragrance"
      />

      <Footer />
    </>
  );
}
