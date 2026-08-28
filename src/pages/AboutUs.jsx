import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditorialCart from "../components/eyewear-fragrance/EditorialCart.jsx";
import ChanelFounder from "../assets/chanel-founder.png";
import emailjs from "@emailjs/browser";
import LocationForm from "../components/LocationForm.jsx";

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
    <>
      <Navbar />

      <EditorialCart {...history[0]} reverse />
      <EditorialCart {...history[2]} />
      <EditorialCart {...history[1]} reverse />

      <LocationForm />

      <Footer />
    </>
  );
}
