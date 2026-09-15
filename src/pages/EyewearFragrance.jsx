import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCarousel from "../components/eyewear-fragrance/ProductCarousel";
import fragranceProducts from "../data/fragrance-product";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart";
import ChanelBoutiques from "../components/form/ChanelBoutiques";
import HeroForm from "../components/form/HeroForm";

const data = [
  {
    src: "https://i.pinimg.com/736x/3a/ca/33/3aca335c3b3da3e01d3ba2591d0ed856.jpg",
    uppertitle: "Collection 2025/2026",
    title: "Eyewear",
    description:
      "Adorned with heart charms, the frames of the CHANEL eyewear collection highlight a feminine and elegant look.",
    buttonText: "Explore Collection",
    href: "#eyewear-products",
  },
  {
    src: "https://i.pinimg.com/736x/66/97/a1/6697a140fedbebb29969754f1e82f95f.jpg",
    uppertitle: "Collection 2026",
    title: "Explore Collection",
    buttonText: "Explore Collection",
    description: "",
    href: "#fragrance-products",
  },
];

const editorial = [
  {
    src: "https://i.pinimg.com/736x/86/81/a8/8681a8244aaffbe534d40e0cb1370db2.jpg",
    type: "Fragrance",
    title: "Les Eaux de Chanel",
    description:
      "Six scented getaways inspired by destinations that were close to Gabrielle Chanel's heart.",
    href: "#fragrance-products",
    linkText: "Discover",
  },
  {
    src: "https://i.pinimg.com/1200x/b2/32/06/b232066cdb134dd94f7557b570964d50.jpg",
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

      <HeroForm {...data[0]} />

      <ProductCarousel
        title="Eyewear Selection"
        sectionId="eyewear-products"
        backPath="/eyewear-products"
        backLabel="Eyewear & Fragrance"
        apiUrl="https://dummyjson.com/products/category/sunglasses"
      />

      <HeroForm {...data[1]} />

      <EditorialCart {...editorial[0]} />

      <ProductCarousel
        title="Fragrance Selection"
        products={fragranceProducts}
        sectionId="fragrance-products"
        backPath="/fragrance-products"
        backLabel="Eyewear & Fragrance"
        apiUrl="https://dummyjson.com/products/search?q=fragrance"
      />
      <EditorialCart {...editorial[1]} reverse />
      <ChanelBoutiques />

      <Footer />
    </>
  );
}
