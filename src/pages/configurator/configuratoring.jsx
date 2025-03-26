import { useCustomization } from "./context/Customization";
import { useState } from "react";

const Configurator = () => {
  const { shape, setShape, legs, setLegs, material, setMaterial } = useCustomization();
  const [value, setValue] = useState(150);
  const min = 20;
  const max = 200;

  // Výpočet pozice popisku
  const getLeftPosition = () => {
    return ((value - min) / (max - min)) * 100;
  };
  return (
    <>
      <div class="table-title">
        <h1>Konfigurátor stolu</h1>
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
          <label>Výška desky</label>
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
                  background: `linear-gradient(to right,#98ba49 0%, #1A1A1A ${((value - min) / (max - min)) * 100}%, #C4C4C4 ${((value - min) / (max - min)) * 100}%, #C4C4C4 100%)`,
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
          <input type="range" />
        </div>
        <div class="scale-item">
          <label>Tloušťka desky</label>
          <input type="range" />
        </div>
        <div class="scale-item">
          <label>Výška stolu</label>
          <input type="range" />
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
