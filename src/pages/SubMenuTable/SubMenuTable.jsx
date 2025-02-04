import { useState, useEffect } from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

//Translation
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//css
import "./SubMenuTable.css";

function SubMenu() {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

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

  const [hoveredId, setHoveredId] = useState(null);
  const formatCena = (cena) => {
    return cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  return (
    <>
      <Navbar />
      <div className="stoly-main">
        <div className="container">
          <div className="podmenu-title">
            <h1>{t("SubMenuTable.title")}</h1>
            <img src="/img/Underline 1.svg" alt="" />
          </div>
        </div>
        <div className="stoly-wrapper" id="produkty-stolu" data-aos="fade-up">
          <div className="container">
            <div className="title">
              <h2>Nabídka</h2>
              <h1>{t("Product.title")}</h1>
            </div>
            <div className="stoly-contnet">
              {data.map((item) => (
                <div className="stoly-card" key={item.Id}>
                  <img src={item.URL} alt={item.Nazev} onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} />
                  <div className="stoly-text">
                    <h1>{item.Nazev}</h1>
                    <p>
                      {item.Popisek}, {item.Vyska}x{item.Sirka} cm
                    </p>
                    <div className="text-row">
                      <span>{formatCena(item.Cena)} Kč</span>
                      <div className="text-btns">
                        <button className="info" onMouseEnter={() => setHoveredId(item.Id)} onMouseLeave={() => setHoveredId(null)}>
                          <i className="fa-solid fa-info"></i>
                        </button>
                        {hoveredId === item.Id && (
                          <div className="tooltip">
                            <p>
                              Název: <span>{item.Nazev}</span>
                            </p>
                            <p>
                              Výška: <span>{item.Vyska} cm</span>
                            </p>
                            <p>
                              Šířka: <span>{item.Sirka} cm</span>
                            </p>
                            <p>
                              Tloušťka: <span>{item.Tloustka} cm</span>
                            </p>
                            <p>
                              Typ: <span>{item.Typ}</span>
                            </p>
                            <p>
                              Materiál: <span>{item.Material}</span>
                            </p>
                          </div>
                        )}
                        <button className="lupa" onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} title="Detail produktu">
                          <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="services1">
            <div className="configurator" data-aos="zoom-in" data-aos-delay="200" onClick={() => handleLinkClick("/konfigurator", "")}>
              <div className="configuratorImg">
                <img src="img/configurator2.png" alt="" />
                <div className="onfiguratorContent">
                  <h3>{t("configurator_text")}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubMenu;
