import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@splidejs/splide/css";

//css
import "./interiery.css";

function Interiery() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getGallery.php`, {
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

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [formData, setFormData] = useState({
    nazev: selectedCategory,
    jmeno: "",
    email: "",
    telefon: "",
    zprava: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!formData.jmeno || !formData.email || !formData.telefon || !formData.zprava) {
      toast.error("Vyplňte všechny povinné údaje.");
      return;
    }
    fetch("https://designjj-test.eu/php/sendInteriery.php", {
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

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Interiéry | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/interiery" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div class="interiery-wrap">
        <div class="podmenu-title">
          <h1>{t("Int_title")}</h1>
        </div>
        <div class="container">
          <div class="interiery-crossroad">
            <div
              class="crossroad-item"
              onClick={() => {
                setSelectedCategory("Kuchyně");
                setModalOpen(true);
              }}
            >
              <h1>{t("Int_cat_1")}</h1>
            </div>

            <div
              class="crossroad-item"
              onClick={() => {
                setSelectedCategory("Obývací pokoje");
                setModalOpen(true);
              }}
            >
              <h1>{t("Int_cat_2")}</h1>
            </div>

            <div
              class="crossroad-item"
              onClick={() => {
                setSelectedCategory("Šatny");
                setModalOpen(true);
              }}
            >
              <h1>{t("Int_cat_3")}</h1>
            </div>
            <div
              class="crossroad-item"
              onClick={() => {
                setSelectedCategory("Ložnice");
                setModalOpen(true);
              }}
            >
              <h1>{t("Int_cat_4")}</h1>
            </div>
            <div
              class="crossroad-item"
              onClick={() => {
                setSelectedCategory("Koupelny");
                setModalOpen(true);
              }}
            >
              <h1>{t("Int_cat_5")}</h1>
            </div>
          </div>
        </div>
        {modalOpen ? (
          <div class="interiery-modal-wrap">
            <div class="interiery-modal">
              <div class="interiery-form">
                <div className="modal-header">
                  <h3>
                    Poptávkový formulář - <span>{selectedCategory}</span>
                  </h3>
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
                <div class="interiery-form-item">
                  <input type="text" name="jmeno" placeholder={t("phName")} value={formData.jmeno} onChange={handleChange} />
                </div>
                <div class="interiery-form-item">
                  <input type="text" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
                </div>
                <div class="interiery-form-item">
                  <input type="number" name="telefon" placeholder={t("phPhone")} value={formData.telefon} onChange={handleChange} />
                </div>
                <div class="interiery-form-item">
                  <textarea type="text" name="zprava" placeholder={t("phText")} value={formData.zprava} onChange={handleChange} />
                </div>
                <div class="modal-btn">
                  <button className="save-btn" onClick={handleSend}>
                    {t("snd_btn")}
                  </button>
                </div>
              </div>
              <div class="interiery-gallery">
                <div className="interiery-gallery-group">
                  {data
                    .filter((item) => item.kategorie === selectedCategory)
                    .map((item) => (
                      <div className="interiery-gallery-item" key={item.Id}>
                        <img src={item.cesta} alt={item.popis} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default Interiery;
