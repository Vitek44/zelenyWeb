import React from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";

//css
import "./SubMenuTable.css";

function SubMenu() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="services1">
          <div className="service" onClick={() => handleLinkClick("/podmenu", "")}>
            <div className="serviceContent">
              <h1 className="main-text">{t("service1")}</h1>
              <div className="hover-text">
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Stoly konferenční</p>
                </div>
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Stoly do kuchyně</p>
                </div>
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Stoly do pokoje</p>
                </div>
              </div>
            </div>
          </div>
          <div className="service">
            <div className="serviceContent">
              <h1 className="main-text">{t("service2")}</h1>
              <div className="hover-text">
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Kuchyně</p>
                </div>
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Vestavěné skříně</p>
                </div>
                <div class="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>Stoly do pokoje</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
