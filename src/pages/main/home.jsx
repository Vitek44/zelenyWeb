import React from "react";
import { useNavigate } from "react-router-dom";
//Link
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import "@splidejs/splide/dist/css/splide.min.css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

import { HashLink } from "react-router-hash-link";
//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//Slider
import Slider from "../../components/slider/slider";
import SliderRev from "../../components/sliderRev/sliderRev";
import SliderProduct from "../../components/sliderProduct/sliderProduct";
import BtnUpDown from "../../components/btnUpDown/btnUpDown";

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
            <h1 data-aos="fade-up">{t("content-slider")}</h1>
            <div className="button-group">
              <button className="btn-green" data-aos="fade-up" data-aos-delay="50" onClick={() => handleLinkClick("/", "services")}>
                <span>{t("green_btn")}</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
              <button className="btn-white" data-aos="fade-up" data-aos-delay="100" onClick={() => handleLinkClick("/", "kontakt")}>
                <span>{t("white_btn")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container" id="services">
        <div className="title">
          <h2>{t("title1")}</h2>
          <h1>{t("subtitle1")}</h1>
        </div>
        <div className="services">
          <div className="service" data-aos="zoom-in" onClick={() => handleLinkClick("/podmenu", "")}>
            <div className="serviceContent">
              <h1 className="main-text">{t("service1")}</h1>
              <div className="hover-text">
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service1_item1")}</p>
                </div>
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service1_item2")}</p>
                </div>
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service1_item3")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="service" data-aos="zoom-in" data-aos-delay="100">
            <div className="serviceContent">
              <h1 className="main-text">{t("service2")}</h1>
              <div className="hover-text">
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service2_item1")}</p>
                </div>
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service2_item2")}</p>
                </div>
                <div className="service-item">
                  <i className="fa-solid fa-circle"></i>
                  <p>{t("service2_item3")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="configurator" data-aos="zoom-in" data-aos-delay="200" onClick={() => handleLinkClick("/konfigurator", "")}>
          <div className="configuratorImg">
            <img src="img/configurator2.png" alt="" />
            <div className="onfiguratorContent">
              <h3>{t("configurator_text")}</h3>
            </div>
          </div>
        </div>
        <div className="title">
          <h2>{t("title2")}</h2>
          <h1>{t("subtitle2")}</h1>
        </div>
        <Splide
          options={{
            type: "loop",
            autoScroll: {
              pauseOnHover: false,
              speed: 0.5,
            },
            perPage: 3,
            perMove: 1,
            gap: "3rem",
            pagination: false,
            pauseOnHover: true,
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
          extensions={{ AutoScroll }}
        >
          <SliderProduct />
        </Splide>
        <div class="about-wrap" id="about" data-aos="fade-up">
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
        </div>
        <div className="title">
          <h2>{t("title4")}</h2>
          <h1>{t("subtitle4")}</h1>
        </div>
        <div className="video" data-aos="fade-up">
          <div className="movie">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8qN9ZWcHrvY?si=q5xGjN10-eTWHG1O&autoplay=1&mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer;autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
          <div className="kontakt-content">
            <form>
              <div className="form-group">
                <input type="text" placeholder={t("phName")} data-aos="fade-right" />
                <input type="text" placeholder="E-mail" data-aos="fade-left" data-aos-delay="50" />
              </div>
              <div className="form-group">
                <textarea name="text" id="text" placeholder={t("phText")} data-aos="fade-right" data-aos-delay="100"></textarea>
              </div>
              <div className="form-group">
                <button className="kontakt-btn" data-aos="fade-left" data-aos-delay="150">
                  {t("send")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <BtnUpDown />
      <Footer />
    </>
  );
}

export default App;
