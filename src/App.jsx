import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import MakeupSkincare from "./pages/MakeupSkincare";
import JewelryWatches from "./pages/JewelryWatches";
import EyewearFragrance from "./pages/EyewearFragrance";
import AboutUs from "./pages/AboutUs";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shop from "./pages/Shop";
import Galerie from "./pages/Galerie";
import Contact from "./pages/Contact";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing / auth gate */}
        <Route path="/" element={<Dashboard />} />

        {/* Main app */}
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/makeup-skincare" element={<MakeupSkincare />} />
        <Route path="/jewelry-watches" element={<JewelryWatches />} />
        <Route path="/eyewear-fragrance" element={<EyewearFragrance />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        {/* Shopping */}
        <Route path="/product" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
