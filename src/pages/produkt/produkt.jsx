import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./produkt.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import AOS from "aos";
import "aos/dist/aos.css";
import SliderProduct from "../../components/sliderProduct/sliderProduct";
import i18next from "i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { div } from "three/tsl";
import { use } from "react";

function Produkt({ id }) {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);
  const { t } = useTranslation();

  const [modalOpen, setModalOpen] = useState(false);

  const [getData, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php?id=${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data[0]);
        } else {
          toast.error("Nepodařilo se načíst data.");
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
        toast.error("Chyba při komunikaci se serverem.");
      });
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const cenaBezDPH = getData?.Cena ? Math.round(getData.Cena / 1.21) : 0;

  const formatCena = (cena) => {
    if (!cena) return "0"; // Ošetření pro undefined nebo null
    return cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const images = [
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: getData.URL,
      thumbnail: getData.URL,
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: getData.URL1,
      thumbnail: getData.URL1,
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: getData.URL2,
      thumbnail: getData.URL2,
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: getData.URL3,
      thumbnail: getData.URL3,
    },
  ];

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

  const [formData, setFormData] = useState({
    id: "",
    nazev: "",
    jmeno: "",
    email: "",
    telefon: "",
    zprava: "",
  });

  useEffect(() => {
    if (getData) {
      setFormData((prev) => ({
        ...prev,
        id: getData.Id || "",
        nazev: getData.Nazev || "",
      }));
    }
  }, [getData]); // Spustí se, když se `getData` změní

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!formData.jmeno || !formData.email || !formData.telefon || !formData.zprava) {
      toast.error("Vyplňte všechny povinné údaje.");
      return;
    }
    fetch("https://designjj-test.eu/php/sendEmail.php", {
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
            id: "",
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

  const [kDispozici, setKDispozici] = useState(true);

  useEffect(() => {
    setKDispozici(Number(getData.Zakoupeno) !== 1);
  }, [getData.Zakoupeno]);

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`${getData.Nazev} | Filip Zelený`}</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="produkt-main">
        <div className="container">
          <div className="produkt-title" data-aos="fade-down">
            <a href="/stoly" title="Zpět na stoly">
              <i className="fa-solid fa-arrow-left"></i>
            </a>
            <h1>{i18next.language === "de" ? getData.NazevDE : i18next.language === "en" ? getData.NazevEN : getData.Nazev}</h1>
          </div>
          <div className="produkt-wrap">
            <div className="produkt-gallery" data-aos="fade-right">
              <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
            </div>
            <div className="produkt-content">
              <div className="produkt-item">
                <h5>{t("Typ_desky")}:</h5>
                <div className="item-row">
                  <p>{t(getData.Material)}</p>
                  <img src={`/img/${getData.Material}.png`} alt={getData.Material} />
                </div>
              </div>
              <div className="produkt-item">
                <h5>{t("Vyska2")}:</h5>
                <div className="item-row">
                  <p>{getData.Uhlopricka + " cm"}</p>
                  <img src="/img/sirka.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>{t("Sirka")}:</h5>
                <div className="item-row">
                  <p>{getData.Sirka + " cm"}</p>
                  <img src="/img/vyska.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>{t("Vyska")}:</h5>
                <div className="item-row">
                  <p>{getData.Vyska + " cm"}</p>
                  <img src="/img/vyska2.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>{t("Tloustka")}:</h5>
                <div className="item-row">
                  <p>{getData.Tloustka + " cm"}</p>
                  <img src="/img/tloustka.svg" alt="" />
                </div>
              </div>
              <div className="produkt-akce">
                <div className="produkt-cena">
                  <h3>{formatCena(getFormattedPrice(getData.Cena))}</h3>
                </div>
                <div className="produkt-btn">
                  <button className="modalOpen" onClick={() => setModalOpen(true)} disabled={!kDispozici}>
                    {kDispozici ? t("Produkt_btn") : t("Vyprodano")}
                    <i className="fa-solid fa-basket-shopping"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {modalOpen ? (
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h3>
                    Poptávka stolu <span>{i18next.language === "de" ? getData.NazevDE : i18next.language === "en" ? getData.NazevEN : getData.Nazev}</span>
                  </h3>
                  <button
                    className="close-modal"
                    onClick={() => {
                      setModalOpen(false);
                      setFormData({
                        id: "",
                        nazev: "",
                        jmeno: "",
                        email: "",
                        telefon: "",
                        zprava: "",
                      });
                    }}
                    title="Zavřít okno"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
                <div className="modal-content">
                  <div className="form-group">
                    <input type="text" name="jmeno" placeholder="Firma / Jméno" value={formData.jmeno} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <input type="number" name="telefon" placeholder="Telefon" value={formData.telefon} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <textarea name="zprava" placeholder="Zpráva" value={formData.zprava} onChange={handleChange}></textarea>
                  </div>
                  <div className="modal-btn">
                    <button className="save-btn" onClick={handleSend}>
                      {t("Send_btn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="desc-wrapper">
            <div className="desc-content">
              <div className="desc-title">{t("Popis_stolu")}</div>
              <div className="desc-text">
                <p>{i18next.language === "de" ? getData.PopisDE : i18next.language === "en" ? getData.PopisEN : getData.Popis}</p>
              </div>
            </div>
          </div>
          <div className="title">
            <h2>{t("title7")}</h2>
            <h1>{t("subtitle7")}</h1>
          </div>
          <SliderProduct />
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

export default Produkt;
