import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// BrowserRouter a další
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import SubMenu from "./pages/SubMenuTable/SubMenuTable";
import Konfigurator from "./pages/configurator/configurator";
import Produkt from "./pages/produkt/produkt";
import Galerie from "./pages/galerie/galerie";
import Interiery from "./pages/interiery/interiery";
import Main from "./pages/main/home";

// css
import "./App.css";

// Hlavní App komponenta
function App() {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);

  const [Id, setId] = useState("");
  const location = useLocation(); // Použití useLocation

  // Funkce pro získání query parametrů
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param); // Získá hodnotu parametru z URL
  };

  useEffect(() => {
    const urlemail = getQueryParam("id"); // Získá query parametr "id"
    setId(urlemail);
  }, [location]);

  return (
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/stoly" element={<SubMenu />} />
      <Route path="/konfigurator" element={<Konfigurator />} />
      <Route path="/stoly/produkt" element={<Produkt id={Id} />} />
      <Route path="/galerie" element={<Galerie />} />
      <Route path="/interiery" element={<Interiery />} />
    </Routes>
  );
}

// Tento komponent obaluje celou aplikaci v <BrowserRouter>
export default function AppWithRouter() {
  return (
    <BrowserRouter>
      {" "}
      {/* BrowserRouter na vrcholu */}
      <App />
    </BrowserRouter>
  );
}
