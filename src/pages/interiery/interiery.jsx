import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";

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
          <div class="crossroad-item">
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
        <div class="container">
          {/* <div class="interiery-content">
            {data.map((item) => (
              <div class="interiery-item">
                <img src={item.cesta} alt={item.popis} />
                <div class="hover-text2">
                  <h3>{item.kategorie}</h3>
                  <h1>{item.popis}</h1>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Interiery;
