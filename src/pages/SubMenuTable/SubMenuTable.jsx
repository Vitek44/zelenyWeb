import React from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//css
import "./SubMenuTable.css";

function SubMenu() {
  let navigate = useNavigate();
  const handleLinkClick = (path, id) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById(id) ? document.getElementById(id).offsetTop - 150 : 0,
        behavior: "smooth",
      });
    }, 100);
  };
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div class="stoly-main">
        <div class="container">
          <div class="stoly-title">
            <h1>{t("SubMenuTable.title")}</h1>
          </div>
        </div>
        <div className="container">
          <div className="services1">
            <div className="service" onClick={() => handleLinkClick("/podmenu", "")}>
              <div className="serviceContent">
                <h1 className="main-text">{t("service3")}</h1>
              </div>
            </div>
            <div className="service">
              <div className="serviceContent">
                <h1 className="main-text">{t("service4")}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="stoly-wrapper">
          <div class="container">
            <div class="title">
              <h2>Nabídka</h2>
              <h1>{t("Product.title")}</h1>
            </div>
            <div class="stoly-contnet">
              <div class="stoly-card" onClick={() => handleLinkClick("/produkt", "")}>
                <h1>Stolík žolík</h1>
              </div>
              <div class="stoly-card">
                <h1>Stolík polík</h1>
              </div>
              <div class="stoly-card">
                <h1>Stolík dolík</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
