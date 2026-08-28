import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LocationForm from "../components/LocationForm.jsx"

export default function Home() {
  return (
    <>
      <Navbar />

<LocationForm />
      <Footer />
    </>
  );
}
