import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import HomeSection from "./pages/HomeSection";
import FashionSection from "./pages/FashionSection";
import MakeupSkincare from "./pages/MakeupSkincare";
import JewelryWatches from "./pages/JewelryWatches";
import EyewearFragrance from "./pages/EyewearFragrance";
import AboutUsSection from "./pages/AboutUsSection";
import ProductDetailSection from "./pages/ProductDetailSection";
import CartSection from "./pages/CartSection";
import CheckoutSection from "./pages/CheckoutSection";
import ShopSection from "./pages/ShopSection";
import GalerieSection from "./pages/GalerieSection";
import ContactSection from "./pages/ContactSection";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import LandingPage from "./pages/LandingPage";
import ProfileSection from "./pages/ProfileSection";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      
        <Route path="/home" element={<HomeSection />} />
        <Route path="/shop" element={<ShopSection />} />
        <Route path="/shop/:categorySlug" element={<ShopSection />} />
        <Route path="/fashion" element={<FashionSection />} />
        <Route path="/makeup-skincare" element={<MakeupSkincare />} />
        <Route path="/jewelry-watches" element={<JewelryWatches />} />
        <Route path="/eyewear-fragrance" element={<EyewearFragrance />} />
        <Route path="/galerie" element={<GalerieSection />} />
        <Route path="/about" element={<AboutUsSection />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/product" element={<ProductDetailSection />} />
        <Route path="/cart" element={<CartSection />} />
        <Route path="/checkout" element={<CheckoutSection />} />


        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileSection />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
