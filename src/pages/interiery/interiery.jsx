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
          <h1>Interiéry</h1>
        </div>
        <div class="interiery-crossroad">
          <div class="crossroad-item" onClick={() => setModalOpen(true)}>
            <h1>Kuchyně</h1>
          </div>
          <div class="crossroad-item">
            <h1>Podlahy</h1>
          </div>
          <div class="crossroad-item">
            <h1>Dětské pokoje</h1>
          </div>
          <div class="crossroad-item">
            <h1>Vestavěné skříně</h1>
          </div>
        </div>
        {modalOpen ? (
          <div class="interiery-modal-wrap">
            <div class="interiery-modal">
              <div class="interiery-form">
                <div className="modal-header">
                  <h3>Laces</h3> {/* David je mega zhulenej. Poznamenáno 7.4.2025. 18:05*/}
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
                  <input type="text" placeholder="Jméno" />
                </div>
                <div class="interiery-form-item">
                  <input type="text" placeholder="E-mail" />
                </div>
                <div class="interiery-form-item">
                  <input type="text" placeholder="Telefon" />
                </div>
                <div class="interiery-form-item">
                  <textarea type="text" placeholder="Zpráva" />
                </div>
                <div class="modal-btn">
                  <button className="save-btn">Odeslat</button>
                </div>
              </div>
              <div class="interiery-gallery">
                <Splide
                  options={{
                    type: "loop",
                    perPage: 3,
                    perMove: 1,
                    gap: "3rem",
                    pagination: true,
                    arrows: false,
                    breakpoints: {
                      768: {
                        perPage: 1,
                        gap: "1rem",
                      },
                      1024: {
                        perPage: 2,
                      },
                      1440: {
                        perPage: 2,
                      },
                      1980: {
                        perPage: 3,
                      },
                    },
                  }}
                >
                  {data.map((item) => (
                    <SplideSlide>
                      <div className="interiery-gallery-item" key={item.Id}>
                        <img src="/img/01c.png" alt="" />
                      </div>
                    </SplideSlide>
                  ))}
                </Splide>
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
