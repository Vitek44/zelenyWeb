import React from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";

//css
import "./interiery.css";

function Interiery() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div class="interiery-main">
        <div class="container">
          <div class="podmenu-title">
            <h1>Interiéry</h1>
            <img src="/img/Underline 1.svg" alt="" />
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
