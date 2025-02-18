import { useCustomization } from "./context/Customization";

const Configurator = () => {
  const { shape, setShape, legs, setLegs, material, setMaterial } =
    useCustomization();

  return (
    <>
      <div className="configurator-label">
        <h5>Tvar desky</h5>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          {" "}
          <div
            className={`item ${shape === 1 ? "item--active" : ""}`}
            onClick={() => setShape(1)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/rectangle.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${shape === 2 ? "item--active" : ""}`}
            onClick={() => setShape(2)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/rectangle.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${shape === 3 ? "item--active" : ""}`}
            onClick={() => setShape(3)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Barva desky</h5>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div
            className={`item ${material === "wood1" ? "item--active" : ""}`}
            onClick={() => setMaterial("wood1")}
          >
            <div className="item__label">
              <img src="../../img/wood1.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${material === "wood2" ? "item--active" : ""}`}
            onClick={() => setMaterial("wood2")}
          >
            <div className="item__label">
              <img src="../../img/wood2.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="configurator-label">
        <h5>Typ nožek</h5>
      </div>
      <div className="configurator-item">
        <div className="c-item-row">
          <div
            className={`item ${legs === 1 ? "item--active" : ""}`}
            onClick={() => setLegs(1)}
          >
            <div className="item__label">
              <img src="../../img/leg4.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 2 ? "item--active" : ""}`}
            onClick={() => setLegs(2)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/leg5.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 3 ? "item--active" : ""}`}
            onClick={() => setLegs(3)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/leg6.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 4 ? "item--active" : ""}`}
            onClick={() => setLegs(4)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/leg1.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 5 ? "item--active" : ""}`}
            onClick={() => setLegs(5)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 6 ? "item--active" : ""}`}
            onClick={() => setLegs(6)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
          <div
            className={`item ${legs === 7 ? "item--active" : ""}`}
            onClick={() => setLegs(7)}
          >
            <div className="item__label">
              {" "}
              <img src="../../img/circle.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="configurator-label">
        <h5>Barva nožek</h5>
      </div>
      <div className="configurator-item">
        <div className="c-item-row"></div>
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
