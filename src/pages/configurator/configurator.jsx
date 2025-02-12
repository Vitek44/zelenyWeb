import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";
import "./configurator.css";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Konfigurator() {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedShape, setSelectedShape] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedLegs, setSelectedLegs] = useState("");
  const [dimensions, setDimensions] = useState({
    height: "",
    length: "",
    thickness: "",
    width: "",
  });

  const handleSelect = (category, value) => {
    if (category === "shape") setSelectedShape(value);
    if (category === "type") setSelectedType(value);
    if (category === "legs") setSelectedLegs(value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDimensions((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Vybrané parametry:", {
      tvar: selectedShape,
      typ: selectedType,
      nohy: selectedLegs,
      rozměry: dimensions,
    });
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("configuratorTitle")} | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/konfigurator" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="configurator-main">
        <div className="container">
          <div className="podmenu-title">
            <h1>{t("configuratorTitle")}</h1>
          </div>
          <div className="configurator-section">
            <div className="configurator-picture">
              {/* <img src="../../img/01c.png" alt="" />*/}
              Loading <div className="progress"></div>
            </div>
            <div className="configurator-content">
              <div className="configurator-label">
                <h5>Tvar desky</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">
                  <span onClick={() => handleSelect("shape", "Čtverec")} className={selectedShape === "Čtverec" ? "selected" : ""}>
                    <img src="../../img/rectangle.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("shape", "Kruh")} className={selectedShape === "Kruh" ? "selected" : ""}>
                    <img src="../../img/circle.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="configurator-label">
                <h5>Typ desky</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">
                  <span onClick={() => handleSelect("type", "Dřevěná")} className={selectedType === "Dřevěná" ? "selected" : ""}>
                    <img src="../../img/wood3.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("type", "Skleněná")} className={selectedType === "Skleněná" ? "selected" : ""}>
                    <img src="../../img/wood2.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("type", "Kovová")} className={selectedType === "Kovová" ? "selected" : ""}>
                    <img src="../../img/wood1.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="configurator-label">
                <h5>Typ nožiček</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">
                  <span onClick={() => handleSelect("legs", "Klasické")} className={selectedLegs === "Klasické" ? "selected" : ""}>
                    <img src="../../img/leg1.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("legs", "Moderní")} className={selectedLegs === "Moderní" ? "selected" : ""}>
                    <img src="../../img/leg2.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("legs", "Designové")} className={selectedLegs === "Designové" ? "selected" : ""}>
                    <img src="../../img/leg3.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("legs", "Křivý")} className={selectedLegs === "Křivý" ? "selected" : ""}>
                    <img src="../../img/leg4.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("legs", "Rovný")} className={selectedLegs === "Rovný" ? "selected" : ""}>
                    <img src="../../img/leg5.png" alt="" />
                  </span>
                  <span onClick={() => handleSelect("legs", "Cvrkec")} className={selectedLegs === "Cvrkec" ? "selected" : ""}>
                    <img src="../../img/leg6.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="configurator-parametres">
                <label>
                  <div className="configurator-label">
                    <h5>Výška</h5>
                  </div>
                  <input type="number" name="height" placeholder={"cm"} value={dimensions.height} onChange={handleInputChange} />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Délka</h5>
                  </div>
                  <input type="number" name="length" placeholder={"cm"} value={dimensions.length} onChange={handleInputChange} />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Tloušťka</h5>
                  </div>
                  <input type="number" name="thickness" placeholder={"cm"} value={dimensions.thickness} onChange={handleInputChange} />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Šířka</h5>
                  </div>
                  <input type="number" name="width" placeholder={"cm"} value={dimensions.width} onChange={handleInputChange} />
                </label>
              </div>
            </div>
          </div>
          <div className="configurator-send">
            <button onClick={handleSubmit}>Odeslat konfiguraci</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Konfigurator;
