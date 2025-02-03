import { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./produkt.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
const Produkt = () => {
  const [getData, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data[0]);
          console.log("Data:", data.data[0]);
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
    loadData();
  }, []);

  const cenaBezDPH = getData?.Cena ? Math.round(getData.Cena / 1.21) : 0;

  const images = [
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "/img/" + getData.URL,
      thumbnail: "/img/08b.png",
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "/img/" + getData.URL,
      thumbnail: "/img/08bg.png",
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "/img/" + getData.URL,
      thumbnail: "/img/01c.png",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="produkt-main">
        <div className="container">
          <div className="produkt-title">
            <h1>Žolík stolík</h1>
          </div>
          <div className="produkt-wrap">
            <div className="produkt-gallery">
              <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showNav={false} />
            </div>
            <div className="produkt-content">
              <div className="produkt-item">
                <h5>Typ desky:</h5>
                <div className="item-row">
                  <p>{getData.Material}</p>
                  <img src="/img/typ_desky.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>Šířka desky:</h5>
                <div className="item-row">
                  <p>{getData.Sirka + " cm"}</p>
                  <img src="/img/sirka.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>Výška desky:</h5>
                <div className="item-row">
                  <p>{getData.Vyska + " cm"}</p>
                  <img src="/img/vyska.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>Tloušťka desky:</h5>
                <div className="item-row">
                  <p>{getData.Tloustka + " cm"}</p>
                  <img src="/img/tloustka.svg" alt="" />
                </div>
              </div>
              <div className="produkt-item">
                <h5>Výška stolu:</h5>
                <div className="item-row">
                  <p>{getData.Uhlopricka + " cm"}</p>
                  <img src="/img/vyska2.svg" alt="" />
                </div>
              </div>
              <div className="produkt-akce">
                <div className="produkt-cena">
                  <span>{"ID#" + getData.Prodej_id}</span>
                  <h3>{getData.Cena + " ,-"}</h3>
                  <p>{cenaBezDPH + " ,- bez DPH"} </p>
                </div>
                <div className="produkt-btn">
                  <button>Zeptat se na stůl</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Produkt;
