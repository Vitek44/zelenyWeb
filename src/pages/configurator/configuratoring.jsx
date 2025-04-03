import { useCustomization } from "./context/Customization";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const Configurator = () => {
  const { shape, setShape, legs, setLegs, material, setMaterial } = useCustomization();
  const [value, setValue] = useState(160);
  const [value1, setValue1] = useState(80);
  const [value2, setValue2] = useState(30);
  const [value3, setValue3] = useState(65);
  const min = 20;
  const max = 200;

  const min2 = 10;
  const max2 = 100;

  // Výpočet pozice popisku
  const getLeftPosition = () => {
    return ((value - min) / (max - min)) * 100;
  };

  const getLeftPosition1 = () => {
    return ((value1 - min) / (max - min)) * 100;
  };

  const getLeftPosition2 = () => {
    return ((value2 - min2) / (max2 - min2)) * 100;
  };

  const getLeftPosition3 = () => {
    return ((value3 - min2) / (max2 - min2)) * 100;
  };

  const checkboxRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = isOpen;
    }
  }, [isOpen]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const languages = [
    {
      code: "cs",
      name: "CZ",
      country_code: "cz",
    },
    {
      code: "en",
      name: "EN",
      country_code: "gb",
    },
    {
      code: "de",
      name: "DE",
      country_code: "de",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18next.language);

  const dropdownRef = useRef(null); // Reference for the dropdown menu

  // Toggle the dropdown menu on click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setIsDropdownOpen(false);
  };

  let navigate = useNavigate();

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div class="table-title">
        <h1>Konfigurátor stolu</h1>
        <div className="language-switch" ref={dropdownRef}>
          <button className="language-button" onClick={toggleDropdown}>
            <img src={`/img/${currentLanguage?.country_code}.svg`} alt={`${currentLanguage?.name} flag`} className="flag-img" />
            {currentLanguage?.name.toUpperCase()}
            <span>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isDropdownOpen && (
            <div className="language-dropdown">
              {languages
                .filter((lang) => lang.code !== i18next.language)
                .map(({ code, name, country_code }) => (
                  <button key={code} className="dropdown-item" onClick={() => changeLanguage(code)}>
                    <img src={`/img/${country_code}.svg`} alt={`${name} flag`} className="flag-img" />
                    {name.toUpperCase()}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="configurator-label">
        <h5>Tvar desky</h5>
        <hr></hr>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div className={`item ${shape === 1 ? "item--active" : ""}`} onClick={() => setShape(1)}>
            <div className="item__label">
              <img src="../../img/Rectangle 147.svg" alt="" />
            </div>
          </div>
          <div className={`item ${shape === 3 ? "item--active" : ""}`} onClick={() => setShape(3)}>
            <div className="item__label">
              <img src="../../img/Ellipse 15.svg" alt="" />
            </div>
          </div>
          <div className={`item ${shape === 4 ? "item--active" : ""}`} onClick={() => setShape(4)}>
            <div className="item__label">
              <img src="../../img/Vector 111.svg" alt="" />
            </div>
          </div>
          <div className={`item ${shape === 5 ? "item--active" : ""}`} onClick={() => setShape(5)}>
            <div className="item__label">
              <img src="../../img/Polygon 5.svg" alt="" />
            </div>
          </div>
          <div className={`item ${shape === 6 ? "item--active" : ""}`} onClick={() => setShape(6)}>
            <div className="item__label">
              <img src="../../img/Polygon 4.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Barva desky</h5>
        <hr></hr>
      </div>
      <div className="configurator-item-color">
        <div className={`item-color ${material === "wood1" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood1")}>
          <img src="../../img/wood1.png" alt="" />
          <h5>Dub</h5>
        </div>
        <div className={`item-color ${material === "wood2" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood2")}>
          <img src="../../img/wood2.png" alt="" />
          <h5>Bříza</h5>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Rozměry</h5>
        <hr></hr>
      </div>
      <div class="configurator-scale" style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
        <div class="scale-item">
          <label>Délka desky</label>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Hodnota v thumbu */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Hodnota v thumbu */}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: `${getLeftPosition()}%`,
                  transform: "translateX(-50%)",
                  background: "#8ABF37",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {value} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min}
                max={max}
                value={value}
                id="sirka-desky"
                onChange={(e) => setValue(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((value - min) / (max - min)) * 100}%, #C4C4C4 ${((value - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div class="scale-item">
          <label>Šířka desky</label>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Hodnota v thumbu */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Hodnota v thumbu */}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: `${getLeftPosition1()}%`,
                  transform: "translateX(-50%)",
                  background: "#8ABF37",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {value1} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min}
                max={max}
                value={value1}
                id="sirka-desky"
                onChange={(e) => setValue1(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((value1 - min) / (max - min)) * 100}%, #C4C4C4 ${((value1 - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div class="scale-item">
          <label>Tloušťka desky</label>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Hodnota v thumbu */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Hodnota v thumbu */}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: `${getLeftPosition2()}%`,
                  transform: "translateX(-50%)",
                  background: "#8ABF37",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {value2} mm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min2}
                max={max2}
                value={value2}
                id="sirka-desky"
                onChange={(e) => setValue2(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((value2 - min2) / (max2 - min2)) * 100}%, #C4C4C4 ${((value2 - min2) / (max2 - min2)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div class="scale-item">
          <label>Výška stolu</label>
          <div style={{ position: "relative", width: "100%" }}>
            {/* Hodnota v thumbu */}
            <div style={{ position: "relative", width: "100%" }}>
              {/* Hodnota v thumbu */}
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: `${getLeftPosition3()}%`,
                  transform: "translateX(-50%)",
                  background: "#8ABF37",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {value3} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min2}
                max={max2}
                value={value3}
                id="sirka-desky"
                onChange={(e) => setValue3(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((value3 - min2) / (max2 - min2)) * 100}%, #C4C4C4 ${((value3 - min2) / (max2 - min2)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>{" "}
        </div>
      </div>

      <div className="configurator-label">
        <h5>Typ nožek</h5>
        <hr></hr>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div className={`item ${legs === 1 ? "item--active" : ""}`} onClick={() => setLegs(1)}>
            <div className="item__label">
              <img src="../../img/leg4.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 2 ? "item--active" : ""}`} onClick={() => setLegs(2)}>
            <div className="item__label">
              <img src="../../img/leg5.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 3 ? "item--active" : ""}`} onClick={() => setLegs(3)}>
            <div className="item__label">
              <img src="../../img/leg6.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 4 ? "item--active" : ""}`} onClick={() => setLegs(4)}>
            <div className="item__label">
              <img src="../../img/leg1.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 5 ? "item--active" : ""}`} onClick={() => setLegs(5)}>
            <div className="item__label">
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 6 ? "item--active" : ""}`} onClick={() => setLegs(6)}>
            <div className="item__label">
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
          <div className={`item ${legs === 7 ? "item--active" : ""}`} onClick={() => setLegs(7)}>
            <div className="item__label">
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Barva nožiček</h5>
        <hr></hr>
      </div>
      <div className="configurator-item-color">
        <div className={`item-color ${material === "leg1" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg1")}>
          <img src="../../img/wood1.png" alt="" />
          <h5>Podle dřeva</h5>
        </div>
        <div className={`item-color ${material === "leg2" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg2")}>
          <img src="../../img/black.png" alt="" />
          <h5>Černá</h5>
        </div>
        <div className={`item-color ${material === "leg3" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg3")}>
          <img src="../../img/white.png" alt="" />
          <h5>Bílá</h5>
        </div>
        <div className={`item-color ${material === "leg4" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg4")}>
          <img src="../../img/steel.jpeg" alt="" />
          <h5>Broušená ocel</h5>
        </div>
      </div>
    </>
  );
};

export default Configurator;

{
  /*<div className="configurator-content">
              <div className="configurator-label">
                <h5>Tvar desky</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">zkouska</div>
              </div>
              <div className="configurator-label">
                <h5>Typ desky</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">
                  <span
                    onClick={() => handleSelect("type", "Dřevěná")}
                    className={selectedType === "Dřevěná" ? "selected" : ""}
                  >
                    <img src="../../img/wood3.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("type", "Skleněná")}
                    className={selectedType === "Skleněná" ? "selected" : ""}
                  >
                    <img src="../../img/wood2.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("type", "Kovová")}
                    className={selectedType === "Kovová" ? "selected" : ""}
                  >
                    <img src="../../img/wood1.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="configurator-label">
                <h5>Typ nožiček</h5>
              </div>
              <div className="configurator-item">
                <div className="c-item-row">
                  <span
                    onClick={() => handleSelect("legs", "Klasické")}
                    className={selectedLegs === "Klasické" ? "selected" : ""}
                  >
                    <img src="../../img/leg1.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("legs", "Moderní")}
                    className={selectedLegs === "Moderní" ? "selected" : ""}
                  >
                    <img src="../../img/leg2.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("legs", "Designové")}
                    className={selectedLegs === "Designové" ? "selected" : ""}
                  >
                    <img src="../../img/leg3.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("legs", "Křivý")}
                    className={selectedLegs === "Křivý" ? "selected" : ""}
                  >
                    <img src="../../img/leg4.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("legs", "Rovný")}
                    className={selectedLegs === "Rovný" ? "selected" : ""}
                  >
                    <img src="../../img/leg5.png" alt="" />
                  </span>
                  <span
                    onClick={() => handleSelect("legs", "Cvrkec")}
                    className={selectedLegs === "Cvrkec" ? "selected" : ""}
                  >
                    <img src="../../img/leg6.png" alt="" />
                  </span>
                </div>
              </div>
              <div className="configurator-parametres">
                <label>
                  <div className="configurator-label">
                    <h5>Výška</h5>
                  </div>
                  <input
                    type="number"
                    name="height"
                    placeholder={"cm"}
                    value={dimensions.height}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Délka</h5>
                  </div>
                  <input
                    type="number"
                    name="length"
                    placeholder={"cm"}
                    value={dimensions.length}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Tloušťka</h5>
                  </div>
                  <input
                    type="number"
                    name="thickness"
                    placeholder={"cm"}
                    value={dimensions.thickness}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  <div className="configurator-label">
                    <h5>Šířka</h5>
                  </div>
                  <input
                    type="number"
                    name="width"
                    placeholder={"cm"}
                    value={dimensions.width}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="configurator-send">
            <button onClick={handleSubmit}>Odeslat konfiguraci</button>
          </div>
        </div> */
}
