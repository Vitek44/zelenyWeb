import { useCustomization } from "./context/Customization";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

const Configurator = () => {
  const { shape, setShape, edge, setEdge, legs, setLegs, material, setMaterial, legColor, setLegColor, delka, setDelka, sirka, setSirka, vyska, setVyska, tloustka, setTloustka, epoxid, setEpoxid, barvaEpoxidu, setbarvaEpoxidu } = useCustomization();

  const [visible, setVisible] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    console.log(legColor);
    console.log(material);
  }, []);

  const [formData, setFormData] = useState({
    nazev: "",
    jmeno: "",
    email: "",
    telefon: "",
    zprava: "",
    config: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!formData.jmeno || !formData.email || !formData.telefon || !formData.zprava) {
      toast.error("Vyplňte všechny povinné údaje.");
      return;
    }
    fetch("https://filipzeleny.cz/php/sendInteriery.php", {
      method: "POST", // Správná metoda
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Převod objektu na JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Zpráva byla odeslána.");
          setModalOpen(false);
          setFormData({
            nazev: "",
            jmeno: "",
            email: "",
            telefon: "",
            zprava: "",
          });
        } else {
          toast.error("Nepodařilo se odeslat zprávu.");
        }
      })
      .catch((err) => {
        console.error("Chyba při odesílání zprávy:", err);
        toast.error("Chyba při komunikaci se serverem.");
      });
  };

  const realShape = () => {
    switch (shape) {
      case 1:
        return "Čtverec";
      case 2:
        return "Kruh";
      case 3:
        return "Přírodní";
      case 4:
        return "Hexagon";
    }
  };

  const realEdge = () => {
    switch (edge) {
      case 1:
        return "Hrana";
      case 2:
        return "Kosa";
      case 3:
        return "Kulatý";
    }
  };

  return (
    <>
      <div className="configurator-content">
        <div className="table-title">
          <h1>{t("table_configurator")}</h1>
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
          <h5>{t("desk_shape")}</h5>
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
          <h5>{t("edge_shape")}</h5>
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
          <h5>{t("desk_color")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-item-color">
          <div className={`item-color ${material === "Dub" ? "item-color-active" : ""}`} onClick={() => setMaterial("Dub")}>
            <img src="../../img/Dub.png" alt="" draggable="false" />
            <h5>{t("material1")}</h5>
          </div>
          <div className={`item-color ${material === "Jasan" ? "item-color-active" : ""}`} onClick={() => setMaterial("Jasan")}>
            <img src="../../img/Jasan.png" alt="" draggable="false" />
            <h5>{t("material3")}</h5>
          </div>
          <div className={`item-color ${material === "Ořech" ? "item-color-active" : ""}`} onClick={() => setMaterial("Ořech")}>
            <img src="../../img/Ořech.png" alt="" draggable="false" />
            <h5>{t("material4")}</h5>
          </div>
          <div className={`item-color ${material === "Americký-ořech" ? "item-color-active" : ""}`} onClick={() => setMaterial("Americký-ořech")}>
            <img src="../../img/Americký ořech.png" alt="" draggable="false" />
            <h5>{t("material5")}</h5>
          </div>
          <div className={`item-color ${material === "Kaštan" ? "item-color-active" : ""}`} onClick={() => setMaterial("Kaštan")}>
            <img src="../../img/Kaštan.png" alt="" draggable="false" />
            <h5>{t("material6")}</h5>
          </div>
          <div className={`item-color ${material === "Oliva" ? "item-color-active" : ""}`} onClick={() => setMaterial("Oliva")}>
            <img src="../../img/Oliva.png" alt="" draggable="false" />
            <h5>{t("material7")}</h5>
          </div>
        </div>
        <div className="configurator-label">
          <h5>{t("sizes")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-scale" style={{ position: "relative", width: "100%", maxWidth: "550px" }}>
          <div className="scale-item">
            <label>{visible ? t("length") : t("diameter")}</label> {/* Realně šírka !!!!!*/}
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
            <label>{t("width")}</label> {/* Realně délka !!!!!*/}
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
            <label>{t("thickness")}</label>
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
                  min={min2}
                  max={max2}
                  value={tloustka}
                  id="sirka-desky"
                  onChange={(e) => setTloustka(Number(e.target.value))}
                  className="slider"
                  style={{
                    width: "100%",
                    height: "6px",
                    background: `linear-gradient(to right,#1A1A1A 0%, #1A1A1A ${((tloustka - min2) / (max2 - min2)) * 100}%, #C4C4C4 ${((tloustka - min2) / (max2 - min2)) * 100}%, #C4C4C4 100%)`,
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
            <label>{t("table_height")}</label>
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
          <h5>{t("leg_type")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-item">
          <div className="c-item-row">
            <div className={`item ${legs === 1 ? "item--active" : ""}`} onClick={() => setLegs(1)}>
              <div className="item__label">
                <img src="../../img/brany-6.png" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${legs === 2 ? "item--active" : ""}`} onClick={() => setLegs(2)}>
              <div className="item__label">
                <img src="../../img/brany.png" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${legs === 3 ? "item--active" : ""}`} onClick={() => setLegs(3)}>
              <div className="item__label">
                <img src="../../img/brany-2.png" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${legs === 4 ? "item--active" : ""}`} onClick={() => setLegs(4)}>
              <div className="item__label">
                <img src="../../img/brany-4.png" alt="" />
              </div>
            </div>
            <div className={`item ${legs === 5 ? "item--active" : ""}`} onClick={() => setLegs(5)}>
              <div className="item__label">
                <img src="../../img/brany-3.png" alt="" />
              </div>
            </div>
            <div className={`item ${legs === 6 ? "item--active" : ""}`} onClick={() => setLegs(6)}>
              <div className="item__label">
                <img src="../../img/brany-5.png" alt="" />
              </div>
            </div>
            <div className={`item ${legs === 7 ? "item--active" : ""}`} onClick={() => setLegs(7)}>
              <div className="item__label">
                <img src="../../img/brany-1.png" alt="" />
              </div>
            </div>
            <div className={`item ${legs === 8 ? "item--active" : ""}`} onClick={() => setLegs(8)}>
              <div className="item__label">
                <img src="../../img/brany-7.png" alt="" />
              </div>
            </div>
            <div className={`item ${legs === 9 ? "item--active" : ""}`} onClick={() => setLegs(9)}>
              <div className="item__label">
                <img src="../../img/brany-8.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="configurator-label">
          <h5>{t("leg_color")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-item-color">
          <div className={`item-color ${legColor === "Dřevo" ? "item-color-active" : ""}`} onClick={() => setLegColor("Dřevo")}>
            <img src="../../img/wood1.png" alt="" draggable="false" />
            <h5>{t("leg_1")}</h5>
          </div>
          <div className={`item-color ${legColor === "Černá" ? "item-color-active" : ""}`} onClick={() => setLegColor("Černá")}>
            <img src="../../img/black.png" alt="" draggable="false" />
            <h5>{t("leg_2")}</h5>
          </div>
          <div className={`item-color ${legColor === "Bílá" ? "item-color-active" : ""}`} onClick={() => setLegColor("Bílá")}>
            <img src="../../img/white.png" alt="" draggable="false" />
            <h5>{t("leg_3")}</h5>
          </div>
          <div className={`item-color ${legColor === "Ocel" ? "item-color-active" : ""}`} onClick={() => setLegColor("Ocel")}>
            <img src="../../img/steel.jpeg" alt="" draggable="false" />
            <h5>{t("leg_4")}</h5>
          </div>
        </div>
        <div className="configurator-label">
          <h5>{t("epoxid_type")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-item">
          <div className="c-item-row">
            <div className={`item ${epoxid === 1 ? "item--active" : ""}`} onClick={() => setEpoxid(1)}>
              <div className="item__label">
                <img src="../../img/nic.png" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${epoxid === 2 ? "item--active" : ""}`} onClick={() => setEpoxid(2)}>
              <div className="item__label">
                <img src="../../img/epoxid1.svg" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${epoxid === 3 ? "item--active" : ""}`} onClick={() => setEpoxid(3)}>
              <div className="item__label">
                <img src="../../img/epoxid2.svg" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${epoxid === 4 ? "item--active" : ""}`} onClick={() => setEpoxid(4)}>
              <div className="item__label">
                <img src="../../img/epoxid3.svg" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${epoxid === 5 ? "item--active" : ""}`} onClick={() => setEpoxid(5)}>
              <div className="item__label">
                <img src="../../img/epoxid4.svg" alt="" draggable="false" />
              </div>
            </div>
            <div className={`item ${epoxid === 7 ? "item--active" : ""}`} onClick={() => setEpoxid(7)}>
              <div className="item__label">
                <img src="../../img/epoxid6.svg" alt="" draggable="false" />
              </div>
            </div>
          </div>
        </div>
        <div className="configurator-label">
          <h5>{t("epoxid_color")}</h5>
          <hr></hr>
        </div>
        <div className="configurator-item-color">
          <div className={`item-color ${barvaEpoxidu === "epoxid" ? "item-color-active" : ""}`} onClick={() => setbarvaEpoxidu("epoxid")}>
            <input type="color" onChange={(e) => setbarvaEpoxidu(e.target.value)} />
            <h5>{t("color")}</h5>
          </div>
        </div>
        <div className="configurator-send">
          <button
            onClick={() => {
              setModalOpen(true);
              setFormData({
                ...formData,
                config: "tvar: " + shape + ", hrana: " + edge + ", nohy: " + legs + ", material: " + material + ", barva nohou: " + legColor + ", delka: " + sirka + ", sirka: " + delka + ", tloustka: " + tloustka + ", vyska: " + vyska,
              });
            }}
          >
            {t("send_conf")}
          </button>
        </div>
      </div>
      {modalOpen ? (
        <div className="interiery-modal-wrap">
          <div className="interiery-modal">
            <div className="interiery-form">
              <div className="modal-header">
                <h3>Odeslání konfigurace</h3>
                <button
                  className="close-modal"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  title="Zavřít okno"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              <div className="interiery-form-item">
                <input type="text" name="jmeno" placeholder={t("phName")} value={formData.jmeno} onChange={handleChange} />
              </div>
              <div className="interiery-form-item">
                <input type="text" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
              </div>
              <div className="interiery-form-item">
                <input type="number" name="telefon" placeholder={t("phPhone")} value={formData.telefon} onChange={handleChange} />
              </div>
              <div className="interiery-form-item">
                <textarea type="text" name="zprava" placeholder={t("phText")} value={formData.zprava} onChange={handleChange} />
              </div>
              <div className="interiery-form-item" style={{ display: "none" }}>
                <input type="text" name="config" placeholder={t("phName")} value={formData.config} onChange={handleChange} />
              </div>
              <div className="modal-btn">
                <button className="save-btn" onClick={handleSend}>
                  {t("snd_btn")}
                </button>
              </div>
              <table>
                <tbody>
                  <tr>
                    <th>
                      <h5>
                        Tvar: <span>{realShape()}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Hrana: <span>{realEdge()}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Nohy: <span>{legs}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Materiál: <span>{material}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Barva nohou: <span>{legColor}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Délka: <span>{delka}</span> cm
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Šířka: <span>{sirka}</span> cm
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Tloušťka: <span>{tloustka}</span> mm
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Výška: <span>{vyska}</span> cm
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Epoxid: <span>{epoxid}</span>
                      </h5>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <h5>
                        Barva epoxidu: <span>{barvaEpoxidu}</span>
                      </h5>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Configurator;
