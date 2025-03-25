import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import { useTranslation } from "react-i18next";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import "./configurator.css";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  useCustomization,
  CustomizationProvider,
} from "./context/Customization";
import Configuratoring from "./configuratoring";

function Konfigurator() {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { shape, setShape, legs, setLegs } = useCustomization();

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
          <link
            rel="canonical"
            href="https://www.filipzeleny.cz/konfigurator"
          />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="configurator-main">
        <div className="container">
          <div className="podmenu-title">
            <h1>{t("configuratorTitle")}</h1>
          </div>
          <div className="configurator-section">
            <CustomizationProvider>
              <div className="configurator-picture">
                <Canvas dpr={[1, 2]}>
                  {/* <color attach="background" args={["#ffffff"]} />
                  <fog attach="fog" args={["#ffffff", 10, 20]} /> */}

                  <color attach="background" args={["#ffffff"]} />

                  <Experience />
                </Canvas>
              </div>
              <div className="configurator-content">
                <Configuratoring />
              </div>
            </CustomizationProvider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Konfigurator;
