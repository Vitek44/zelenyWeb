import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SubMenu from "./pages/SubMenuTable/SubMenuTable";
import Konfigurator from "./pages/configurator/configurator";
import Produkt from "./pages/produkt/produkt";
import Galerie from "./pages/galerie/galerie";
import Interiery from "./pages/interiery/interiery";
import Main from "./pages/main/home";
import "./App.css";

// Hlavní App komponenta, která obaluje aplikaci v <BrowserRouter>
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

// Komponenta, která obsahuje routování a umožňuje použití useLocation()
function AppRoutes() {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);
  const [Id, setId] = useState("");
  const location = useLocation();

  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get(param);
  };

  useEffect(() => {
    const urlemail = getQueryParam("id");
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

export default App;
