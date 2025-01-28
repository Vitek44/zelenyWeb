import React from "react";
import { useNavigate } from "react-router-dom";

//Link

import { HashLink } from "react-router-hash-link";
//Navbar
import Navbar from "../../components/navbar/navbar";
//Slider
import Slider from "../../components/slider/slider";
import SliderRev from "../../components/sliderRev/sliderRev";
import SliderProduct from "../../components/sliderProduct/sliderProduct";

//Translation
import { useTranslation } from "react-i18next";

//css
import "./home.css";

function App() {
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
  return (
    <>
      <Navbar />
      <div className="slide">
        <div className="container">
          <div className="content-slider">
            <h1>{t("content-slider")}</h1>
            <div className="button-group">
              <button className="btn-green" onClick={() => handleLinkClick("/", "about")}>
                <span>Zjistit více</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="btn-white" onClick={() => handleLinkClick("/", "kontakt")}>
                <span>Kotakt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="title">
          <h2>{t("title1")}</h2>
          <h1>{t("subtitle1")}</h1>
        </div>
        <div className="services">
          <div className="service" onClick={() => handleLinkClick("/podmenu", "")}>
            <div className="serviceImg">
              <img src="img/01c.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service1")}</h1>
              </div>
            </div>
          </div>
          <div className="service">
            <div className="serviceImg">
              <img src="img/08d.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service2")}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="configurator" onClick={() => handleLinkClick("/konfigurator", "")}>
          <div className="configuratorImg">
            <img src="img/08d.png" alt="" />
            <div className="onfiguratorContent">
              <h3>{t("configurator_text")}</h3>
            </div>
          </div>
        </div>
        <div className="title">
          <h2>{t("title2")}</h2>
          <h1>{t("subtitle2")}</h1>
        </div>
        <SliderProduct />
        {/*<div className="products">
          <div className="product">
            <div className="productTitle">
              <h2>stolík žolík</h2>
            </div>
            <div className="productImg">
              <img src="img/01cbg.png" alt="" />
            </div>
            <div className="productContent">
              <h3>{t("description1")}</h3>
              <div className="productContent2">
                <h3>{t("warehouse1")}</h3>
                <button>
                  <a href="">{t("productBtn_1")}</a>
                </button>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="productTitle">
              <h2>stolík žolík</h2>
            </div>
            <div className="productImg">
              <img src="img/08bg.png" alt="" />
            </div>
            <div className="productContent">
              <h3>{t("description2")}</h3>
              <div className="productContent2">
                <h3>{t("warehouse2")}</h3>
                <button>
                  <a href="">{t("productBtn_2")}</a>
                </button>
              </div>
            </div>
          </div>
          <div className="product">
            <div className="productTitle">
              <h2>stolík žolík</h2>
            </div>
            <div className="productImg">
              <img src="img/05abg.png" alt="" />
            </div>

            <div className="productContent">
              <h3>{t("description3")}</h3>
              <div className="productContent2">
                <h3>{t("warehouse3")}</h3>
                <button>
                  <a href="">{t("productBtn_3")}</a>
                </button>
              </div>
            </div>
          </div>
        </div>*/}
        <div className="aboutme" id="about">
          <div className="aboutmeText">
            <div className="title">
              <h2>{t("title3")}</h2>
              <h1>{t("subtitle3")}</h1>
            </div>
            <p>{t("text")}</p>
            <br></br>
            <p>{t("quote")}</p>
          </div>
          <div className="aboutmeImg">
            <img src="img/image-removebg-preview 1.png" alt="" />
          </div>
        </div>
        <div className="bar">
          <h3>{t("bar_text1")}</h3>
          <h3>{t("bar_text2")}</h3>
          <h3>{t("bar_text3")}</h3>
        </div>
        <div className="title">
          <h2>{t("title4")}</h2>
          <h1>{t("subtitle4")}</h1>
        </div>
        <div className="video">
          <div className="movie">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8qN9ZWcHrvY?si=q5xGjN10-eTWHG1O&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer;autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>
        <div className="title">
          <h2>{t("title5")}</h2>
          <h1>{t("subtitle5")}</h1>
        </div>
        <SliderRev />
        <div className="kontakt" id="kontakt">
          <div className="title">
            <h2>{t("title6")}</h2>
            <h1>{t("subtitle6")}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
