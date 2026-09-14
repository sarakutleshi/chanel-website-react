
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function GalerieCard({ img, title, desc, href = "/contact" }) {
  return (
    <div>
      <img
        src={img}
        alt={title}
        className="aspect-[3/4] w-full object-cover"
      />

      <div className="mt-6 space-y-2 text-sm">
        <p className="font-medium">CHANEL</p>

        <p>{title}</p>

        <div className="pt-8">
          <p>{desc}</p>

          <Link
            to={href}
            className="mt-3 inline-block underline underline-offset-4"
          >
            Price upon request
          </Link>
        </div>
      </div>
    </div>
  );
}

const galleryItems = [
  {
    img: "https://i.pinimg.com/vwebp/1200x/04/54/1a/04541a75ccefcac6a2b5a95b3ca9e7ea.webp",
    title:
      "Devon Aoki by Patrick Demarchelier for Harper's Bazaar US April 1999",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://i.pinimg.com/564x/e5/02/24/e50224ba7390205ab33ef4ec069859a1.jpg",
    title:
      "Devon Aoki by Patrick Demarchelier for Harper's Bazaar US April 1999",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://i.pinimg.com/736x/06/fb/8d/06fb8d53472c9ba1f4db5f0a1bee386f.jpg",
    title: "Claudia Schiffer for Chanel HC FW 1992",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://i.pinimg.com/1200x/13/e5/31/13e53163d99a73272fee515102919a08.jpg",
    title: "Claudia Schiffer for Chanel HC FW 1992",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://i.pinimg.com/1200x/c4/ea/4f/c4ea4ff3a8f517617105d513933f547b.jpg",
    title:
      "Christy Turlington for Chanel spring 1992 haute couture collection",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://i.pinimg.com/vwebp/736x/d5/5b/16/d55b167415f548b264b54dd59c6fc574.webp",
    title:
      "Christy Turlington for Chanel spring 1992 haute couture collection",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://a.1stdibscdn.com/chanel-vintage-s-s-1988-white-black-lace-camellia-bow-dress-gown-for-sale-picture-2/v_32222/v_256057721741135017503/Screenshot_2025_03_04_at_7_20_59_PM_master.jpeg?disable=upscale&auto=webp&quality=60&width=1400",
    title: "Vintage S/S 1988 White & Black Lace Camellia Bow Dress",
    desc: "In partnership with Desert Vintage",
  },
  {
    img: "https://a.1stdibscdn.com/chanel-vintage-s-s-1988-white-black-lace-camellia-bow-dress-gown-for-sale-picture-6/v_32222/v_256057721741135017454/chanel_vintage_spring_1988_white_black_lace_camellia_bow_dress_gown_3_master.jpg?disable=upscale&auto=webp&quality=60&width=1400",
    title: "Vintage S/S 1988 White & Black Lace Camellia Bow Dress",
    desc: "In partnership with Desert Vintage",
  },
];

export default function Galerie() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 gap-x-4 gap-y-16 md:grid-cols-2">
          {galleryItems.map((item, index) => (
            <GalerieCard
              key={index}
              img={item.img}
              title={item.title}
              desc={item.desc}
              href="/contact"
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

