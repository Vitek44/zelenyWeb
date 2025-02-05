import React from "react";

import Reactgalerie from "./Reactgalerie";

//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { SlideshowLightbox } from "lightbox.js-react";
//Translation
import { useTranslation } from "react-i18next";

//css
import "./galerie.css";

function Galerie() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="content-galery">
          <div className="podmenu-title">
            <h1>Galerie</h1>
            <img src="/img/Underline 1.svg" alt="" />
          </div>
          <Reactgalerie />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Galerie;
