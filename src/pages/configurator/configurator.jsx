import React from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";

//css
import "./configurator.css";
import { useNavigate } from "react-router-dom";

function Konfigurator() {
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
      {/*<div className="outofservice">
        <div className="container">
          <h1>Omlouvám se, ale konfigurátor momentálně není k dispozici.</h1>
          <p>Pro zatím využijte náš kontaktní formulář</p>
          <button className="btn-green" onClick={() => handleLinkClick("/", "kontakt")}>
            <span>Kontakt</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>*/}
      <div className="configurator-content">
        <div className="container">
          <div className="titleConfigurator">
            <h1>{t("configuratorTitle")}</h1>
          </div>
          <div className="configurator-section">
            <div className="configurator3D"></div>
            <div className="configurator-choose">
              <ul>
                <li>
                  Tvar stolu
                  <ul className="dropdown">
                    <li>
                      <i className="fa-regular fa-square" style={{ fontSize: "30px" }}></i>
                    </li>
                    <li>
                      <i className="fa-regular fa-circle" style={{ fontSize: "30px" }}></i>
                    </li>
                  </ul>
                </li>
                <li>
                  Dřevo
                  <ul className="dropdown">
                    <li>
                      <img src="../../img/wood1.png" alt="" />
                    </li>
                    <li>
                      <img src="../../img/wood2.png" alt="" />
                    </li>
                    <li>
                      <img src="../../img/wood3.png" alt="" />
                    </li>
                  </ul>
                </li>
                <li>
                  Typ nožiček
                  <ul className="dropdown">
                    <li>Křivý</li>
                    <li>Rovný</li>
                    <li>Nabackhand</li>
                  </ul>
                </li>
                <li>
                  Barva
                  <ul className="dropdown">
                    <li>
                      <i className="fa-solid fa-circle" style={{ color: "red", fontSize: "30px" }}></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle" style={{ color: "brown", fontSize: "30px" }}></i>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle" style={{ color: "green", fontSize: "30px" }}></i>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="configurator-dimensions">
                <label>
                  Délka
                  <input type="number" placeholder="cm" />
                </label>
                <label>
                  Šířka
                  <input type="number" placeholder="cm" />
                </label>
                <label>
                  Výška
                  <input type="number" placeholder="cm" />
                </label>
                <label>
                  Hloubka
                  <input type="number" placeholder="cm" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Konfigurator;
