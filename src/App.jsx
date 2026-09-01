import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import MakeupSkincare from "./pages/MakeupSkincare";
import JewelryWatches from "./pages/JewelryWatches";
import EyewearFragrance from "./pages/EyewearFragrance";
import AboutUs from "./pages/AboutUs";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Galerie from "./pages/Galerie";
import ContactForm from "./components/ContactForm";
import Contact from "./pages/Contact";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Dashboard />} />

          <Route path="/fashion" element={<Fashion />} />
          <Route path="/makeup-skincare" element={<MakeupSkincare />} />
          <Route path="/jewelry-watches" element={<JewelryWatches />} />
          <Route path="/eyewear-fragrance" element={<EyewearFragrance />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
