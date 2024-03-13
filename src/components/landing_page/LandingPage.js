import "./LandingPage.css";
import Home from "./LP_Components/Home";
import About from "./LP_Components/About";
import Work from "./LP_Components/Work";
import Contact from "./LP_Components/Contact";
import Footer from "./LP_Components/Footer";
import { useContext } from "react";


function LandingPage() {
  return (
    <div className="Lp">
      <Home />
      
      <About />
      <Work />
      <Contact />
      <Footer />
    </div>
  );
}

export default LandingPage;
