import { useState, useEffect } from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { Helmet, HelmetProvider } from "react-helmet-async";

//Translation
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";

import AOS from "aos";
import "aos/dist/aos.css";
//css
import "./SubMenuTable.css";

function SubMenu() {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);
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

  useEffect(() => {
    console.log(t);
  }, []);

  const [hoveredId, setHoveredId] = useState(null);
  const formatCena = (cena) => {
    return cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const [exchangeRate, setExchangeRate] = useState(25); // Defaultní kurz

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/CZK");
        const data = await response.json();
        setExchangeRate(data.rates.EUR);
      } catch (error) {
        console.error("Chyba při načítání kurzu měny:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  const getFormattedPrice = (price) => {
    if (!price || isNaN(price) || !exchangeRate || exchangeRate <= 0 || exchangeRate > 10) {
      return "0 Kč"; // Ochrana proti nesmyslnému kurzu
    }
    if (i18next.language === "de" || i18next.language === "en") {
      return (price * exchangeRate).toFixed(2) + " €";
    }
    return price.toLocaleString("cs-CZ") + " Kč";
  };
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("SubMenuTable.title")} | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/stoly" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="stoly-main">
        <div className="container">
          <div className="podmenu-title">
            <h1>{t("SubMenuTable.title")}</h1>
          </div>
        </div>
        <div className="stoly-wrapper" id="produkty-stolu" data-aos="fade-up">
          <div className="container">
            <div className="stoly-contnet">
              {data.map((item) => (
                <div className="stoly-card" key={item.Id}>
                  <img src={item.URL} alt={item.Nazev} onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} />
                  <div className="stoly-text">
                    <h1>{item.Nazev}</h1>
                    <p>
                      <p>
                        {i18next.language === "de" ? item.PopisekDE : i18next.language === "en" ? item.PopisekEN : item.Popisek} , {item.Vyska}x{item.Sirka} cm
                      </p>
                    </p>
                    <div className="text-row">
                      <span>{formatCena(getFormattedPrice(item.Cena))}</span>
                      <div className="text-btns">
                        <button className="info" title="Infomrace o produktu" onMouseEnter={() => setHoveredId(item.Id)} onMouseLeave={() => setHoveredId(null)}>
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
                        <button className="lupa" onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} title="Zobrazit produkt">
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
            <a href="/konfigurator" className="configurator" data-aos="zoom-in" data-aos-delay="200">
              <h3>{t("configurator_text")}</h3>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubMenu;
