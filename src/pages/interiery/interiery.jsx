import React from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

//css
import "./interiery.css";

function Interiery() {
  const { t } = useTranslation();
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Interiéry | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/interiery" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div class="interiery-main">
        <div class="container">
          <div class="podmenu-title">
            <h1>Interiéry</h1>
          </div>
        </div>
        <div className="container">
          <div className="services1">
            <div className="service">
              <div className="serviceContent">
                <h1 className="main-text">Kuchyně</h1>
              </div>
            </div>
            <div className="service">
              <div className="serviceContent">
                <h1 className="main-text">Skříně</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Interiery;
