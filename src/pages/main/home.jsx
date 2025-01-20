import React from "react";

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
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <Slider />
      <div className="container">
        <div className="title">
          <h2>{t("title1")}</h2>
          <h1>{t("subtitle1")}</h1>
        </div>
        <div className="services">
          <HashLink className="service" to="/podmenu">
            <div className="serviceImg">
              <img src="img/01c.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service1")}</h1>
              </div>
            </div>
          </HashLink>
          <div className="service">
            <div className="serviceImg">
              <img src="img/08d.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service2")}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="configurator">
          <div className="configuratorImg">
            <img src="img/08d.png" alt="" />
            <div className="onfiguratorContent">
              <h3>{t("configurator_text")}</h3>
              <button>{t("Btnconfigurator_text")}</button>
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
        <div className="aboutme">
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
          <div className="videoText">
            <h1>{t("video_text1")}</h1>
            <p>{t("video_text2")}</p>
          </div>
        </div>
        <div className="title">
          <h2>{t("title5")}</h2>
          <h1>{t("subtitle5")}</h1>
        </div>
        <SliderRev />
        <div className="title">
          <h2>{t("title6")}</h2>
          <h1>{t("subtitle6")}</h1>
        </div>
      </div>
    </>
  );
}

export default App;
