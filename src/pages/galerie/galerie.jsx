import React from "react";

import Reactgalerie from "./Reactgalerie";

//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { SlideshowLightbox } from "lightbox.js-react";
//Translation
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

//css
import "./galerie.css";

function Galerie() {
  const { t } = useTranslation();
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Galerie | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/galerie" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="content-galery">
        <div className="podmenu-title">
          <h1>Galerie</h1>
        </div>
        <Reactgalerie />
      </div>
      <Footer />
    </>
  );
}

export default Galerie;
