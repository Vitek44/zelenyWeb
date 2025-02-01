import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./produkt.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
const Produkt = () => {
  const images = [
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "./img/08b.png",
      thumbnail: "./img/08b.png",
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "./img/08bg.png",
      thumbnail: "./img/08bg.png",
    },
    {
      originalHeight: "335px",
      originalWidth: "100%",
      originalClass: "produkt-img",
      original: "./img/01c.png",
      thumbnail: "./img/01c.png",
    },
  ];
  return (
    <>
      <Navbar />
      <div class="produkt-main">
        <div class="container">
          <div class="produkt-title">
            <h1>Žolík stolík</h1>
          </div>
          <div class="produkt-wrap">
            <div class="produkt-gallery">
              <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} showNav={false} />
            </div>
            <div class="produkt-content">
              <div class="produkt-item">
                <h5>Typ desky:</h5>
                <div class="item-row">
                  <p>Brazilská borovice</p>
                  <img src="./img/typ_desky.svg" alt="" />
                </div>
              </div>
              <div class="produkt-item">
                <h5>Šířka desky:</h5>
                <div class="item-row">
                  <p>60 cm</p>
                  <img src="./img/sirka.svg" alt="" />
                </div>
              </div>
              <div class="produkt-item">
                <h5>Výška desky:</h5>
                <div class="item-row">
                  <p>60 cm</p>
                  <img src="./img/vyska.svg" alt="" />
                </div>
              </div>
              <div class="produkt-item">
                <h5>Tloušťka desky:</h5>
                <div class="item-row">
                  <p>3 cm</p>
                  <img src="./img/tloustka.svg" alt="" />
                </div>
              </div>
              <div class="produkt-item">
                <h5>Výška stolu:</h5>
                <div class="item-row">
                  <p>42 cm</p>
                  <img src="./img/vyska2.svg" alt="" />
                </div>
              </div>
              <div class="produkt-akce">
                <div class="produkt-cena">
                  <span>#ID1264</span>
                  <h3>50.000,-</h3>
                  <p>46.000,- bez DPH</p>
                </div>
                <div class="produkt-btn">
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
