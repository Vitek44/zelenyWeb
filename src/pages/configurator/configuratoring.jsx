import { useCustomization } from "./context/Customization";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const Configurator = () => {
  const { shape, setShape, edge, setEdge, legs, setLegs, material, setMaterial, legColor, setLegColor, delka, setDelka, sirka, setSirka, vyska, setVyska, tloustka, setTloustka, epoxid, setEpoxid } = useCustomization();

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (shape === 2 || shape === 4) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [shape]); // useEffect se spustí pouze, když se změní `shape`

  const min = 40;
  const max = 200;

  const min2 = 10;
  const max2 = 100;

  const minVyska = 50;
  const maxVyska = 140;

  // Výpočet pozice popisku
  const getLeftPosition = () => {
    return ((delka - min) / (max - min)) * 100;
  };

  const getLeftPosition1 = () => {
    return ((sirka - min) / (max - min)) * 100;
  };

  const getLeftPosition2 = () => {
    return ((tloustka - min2) / (max2 - min2)) * 100;
  };

  const getLeftPosition3 = () => {
    return ((vyska - minVyska) / (maxVyska - minVyska)) * 100;
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
      <div className="table-title">
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
          <div className={`item ${shape === 1 ? "item--active" : ""}`} title="Čtverec" onClick={() => setShape(1)}>
            <img src="../../img/ctverec.svg" alt="" draggable="false" />
          </div>
          <div className={`item ${shape === 2 ? "item--active" : ""}`} title="Kruh" onClick={() => setShape(2)}>
            <img src="../../img/kruh.svg" alt="" draggable="false" />
          </div>
          <div className={`item ${shape === 3 ? "item--active" : ""}`} title="Přírodní" onClick={() => setShape(3)}>
            <img src="../../img/natura.svg" alt="" draggable="false" />
          </div>
          <div className={`item ${shape === 4 ? "item--active" : ""}`} title="Hexagon" onClick={() => setShape(4)}>
            <img src="../../img/hexagon.svg" alt="" draggable="false" />
          </div>
          {/*
          <div
            className={`item ${shape === 6 ? "item--active" : ""}`}
            onClick={() => setShape(6)}
          >
            <div className="item__label">
              <img src="../../img/Polygon 4.svg" alt="" />
            </div>
          </div>
          */}
        </div>
      </div>
      <div className="configurator-label">
        <h5>Tvar hrany</h5>
        <hr></hr>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div className={`item ${edge === 1 ? "item--active" : ""}`} onClick={() => setEdge(1)}>
            <div className="item__label">
              <img src="../../img/kosa.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${edge === 2 ? "item--active" : ""}`} onClick={() => setEdge(2)}>
            <div className="item__label">
              <img src="../../img/kulatej.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${edge === 3 ? "item--active" : ""}`} onClick={() => setEdge(3)}>
            <div className="item__label">
              <img src="../../img/hrana.svg" alt="" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Barva desky1</h5>
        <hr></hr>
      </div>
      <div className="configurator-item-color">
        <div className={`item-color ${material === "wood1" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood1")}>
          <img src="../../img/Dub.png" alt="" draggable="false" />
          <h5>Dub</h5>
        </div>
        <div className={`item-color ${material === "wood2" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood2")}>
          <img src="../../img/Bříza.png" alt="" draggable="false" />
          <h5>Bříza</h5>
        </div>
        <div className={`item-color ${material === "wood7" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood7")}>
          <img src="../../img/Jasan.png" alt="" draggable="false" />
          <h5>Jasan</h5>
        </div>
        <div className={`item-color ${material === "wood3" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood3")}>
          <img src="../../img/Ořech.png" alt="" draggable="false" />
          <h5>Ořech</h5>
        </div>
        <div className={`item-color ${material === "wood4" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood4")}>
          <img src="../../img/Americký ořech.png" alt="" draggable="false" />
          <h5>Americký ořech</h5>
        </div>
        <div className={`item-color ${material === "wood5" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood5")}>
          <img src="../../img/Kaštan.png" alt="" draggable="false" />
          <h5>Kaštan</h5>
        </div>
        <div className={`item-color ${material === "wood6" ? "item-color-active" : ""}`} onClick={() => setMaterial("wood6")}>
          <img src="../../img/Oliva.png" alt="" draggable="false" />
          <h5>Oliva</h5>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Rozměry</h5>
        <hr></hr>
      </div>
      <div className="configurator-scale" style={{ position: "relative", width: "100%", maxWidth: "550px" }}>
        <div className="scale-item">
          <label>{visible ? "Délka desky" : "Průměr desky"}</label> {/* Realně šírka !!!!!*/}
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
                  background: "#ffffff",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {sirka} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min}
                max={max}
                value={sirka}
                id="sirka-desky"
                onChange={(e) => setSirka(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((sirka - min) / (max - min)) * 100}%, #C4C4C4 ${((sirka - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div className={visible ? "scale-item" : "scale-item-hidden"}>
          <label>Šířka desky</label> {/* Realně délka !!!!!*/}
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
                  background: "#ffffff",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {delka} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={min}
                max={max}
                value={delka}
                id="sirka-desky"
                onChange={(e) => setDelka(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((delka - min) / (max - min)) * 100}%, #C4C4C4 ${((delka - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div className="scale-item">
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
                  background: "#ffffff",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {tloustka} mm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={minVyska}
                max={maxVyska}
                value={tloustka}
                id="sirka-desky"
                onChange={(e) => setTloustka(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((tloustka - minVyska) / (maxVyska - minVyska)) * 100}%, #C4C4C4 ${((tloustka - minVyska) / (max2 - minVyska)) * 100}%, #C4C4C4 100%)`,
                  borderRadius: "5px",
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>
        <div className="scale-item">
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
                  background: "#ffffff",
                  color: "#1A1A1A",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  whiteSpace: "nowrap",
                }}
              >
                {vyska} cm
              </div>

              {/* Posuvník */}
              <input
                type="range"
                min={minVyska}
                max={maxVyska}
                value={vyska}
                id="sirka-desky"
                onChange={(e) => setVyska(Number(e.target.value))}
                className="slider"
                style={{
                  width: "100%",
                  height: "6px",
                  background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((vyska - minVyska) / (maxVyska - minVyska)) * 100}%, #C4C4C4 ${((vyska - minVyska) / (maxVyska - minVyska)) * 100}%, #C4C4C4 100%)`,
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
              <img src="../../img/leg4.png" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${legs === 2 ? "item--active" : ""}`} onClick={() => setLegs(2)}>
            <div className="item__label">
              <img src="../../img/leg5.png" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${legs === 3 ? "item--active" : ""}`} onClick={() => setLegs(3)}>
            <div className="item__label">
              <img src="../../img/leg6.png" alt="" draggable="false" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Typ epoxidu</h5>
        <hr></hr>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div className={`item ${epoxid === 7 ? "item--active" : ""}`} onClick={() => setEpoxid(7)}>
            <div className="item__label">
              <img src="../../img/nic.png" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 1 ? "item--active" : ""}`} onClick={() => setEpoxid(1)}>
            <div className="item__label">
              <img src="../../img/epoxid1.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 2 ? "item--active" : ""}`} onClick={() => setEpoxid(2)}>
            <div className="item__label">
              <img src="../../img/epoxid2.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 3 ? "item--active" : ""}`} onClick={() => setEpoxid(3)}>
            <div className="item__label">
              <img src="../../img/epoxid3.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 1 ? "item--active" : ""}`} onClick={() => setEpoxid(4)}>
            <div className="item__label">
              <img src="../../img/epoxid4.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 2 ? "item--active" : ""}`} onClick={() => setEpoxid(5)}>
            <div className="item__label">
              <img src="../../img/epoxid5.svg" alt="" draggable="false" />
            </div>
          </div>
          <div className={`item ${epoxid === 3 ? "item--active" : ""}`} onClick={() => setEpoxid(6)}>
            <div className="item__label">
              <img src="../../img/epoxid6.svg" alt="" draggable="false" />
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
          <img src="../../img/wood1.png" alt="" draggable="false" />
          <h5>Podle dřeva</h5>
        </div>
        <div className={`item-color ${material === "leg2" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg2")}>
          <img src="../../img/black.png" alt="" draggable="false" />
          <h5>Černá</h5>
        </div>
        <div className={`item-color ${material === "leg3" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg3")}>
          <img src="../../img/white.png" alt="" draggable="false" />
          <h5>Bílá</h5>
        </div>
        <div className={`item-color ${material === "leg4" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg4")}>
          <img src="../../img/steel.jpeg" alt="" draggable="false" />
          <h5>Broušená ocel</h5>
        </div>
        <div className={`item-color ${material === "leg5" ? "item-color-active" : ""}`} onClick={() => setMaterial("leg5")}>
          <input type="color" value={legColor} onChange={(e) => setLegColor(e.target.value)} />
          <h5>Vlastní barva</h5>
        </div>
      </div>
    </>
  );
};

export default Configurator;
