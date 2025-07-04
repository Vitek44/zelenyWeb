import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Splide, SplideSlide } from "@splidejs/react-splide";
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
              setSelectedCategory("Podlahy");
              setModalOpen(true);
            }}
          >
            <h1>{t("Int_cat_2")}</h1>
          </div>

          <div
            class="crossroad-item"
            onClick={() => {
              setSelectedCategory("Interiéry");
              setModalOpen(true);
            }}
          >
            <h1>{t("Int_cat_3")}</h1>
          </div>
          <div
            class="crossroad-item"
            onClick={() => {
              setSelectedCategory("Skříně");
              setModalOpen(true);
            }}
          >
            <h1>{t("Int_cat_4")}</h1>
          </div>
        </div>
        {modalOpen ? (
          <div class="interiery-modal-wrap">
            <div class="interiery-modal">
              <div class="interiery-form">
                <div className="modal-header">
                  <h3>{selectedCategory}</h3>
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
                  <input type="text" placeholder={t("phName")} />
                </div>
                <div class="interiery-form-item">
                  <input type="text" placeholder="E-mail" />
                </div>
                <div class="interiery-form-item">
                  <input type="text" placeholder={t("phPhone")} />
                </div>
                <div class="interiery-form-item">
                  <textarea type="text" placeholder={t("phText")} />
                </div>
                <div class="modal-btn">
                  <button className="save-btn">{t("snd_btn")}</button>
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
