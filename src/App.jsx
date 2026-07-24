import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Fashion from "./pages/Fashion";
import MakeupSkincare from "./pages/MakeupSkincare";
import JewelryWatches from "./pages/JewelryWatches";
import EyewearFragrance from "./pages/EyewearFragrance";
import AboutUs from "./pages/AboutUs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/makeup-skincare" element={<MakeupSkincare />} />
        <Route path="/jewelry-watches" element={<JewelryWatches />} />
        <Route path="/eyewear-fragrance" element={<EyewearFragrance />} />
        <Route path="/about" element={<AboutUs />} />
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
