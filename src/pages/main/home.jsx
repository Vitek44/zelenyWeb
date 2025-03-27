import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//Link
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import "@splidejs/splide/dist/css/splide.min.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { HashLink } from "react-router-hash-link";
//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
//Slider
import Slider from "../../components/slider/slider";
import SliderRev from "../../components/sliderRev/sliderRev";
import SliderProduct from "../../components/sliderProduct/sliderProduct";
import BtnUpDown from "../../components/btnUpDown/btnUpDown";
import AOS from "aos";
import "aos/dist/aos.css";
//Translation
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
//css
import "./home.css";

function App() {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);

  let navigate = useNavigate();
  const handleClick = (event, path, id) => {
    navigate(path);
    setTimeout(() => {
      event.preventDefault(); // Zabrání standardnímu chování odkazu
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        history.replaceState(null, "", window.location.pathname); // Odstraní #
      }
    }, 100);
  };

  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("main-title")} | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="slide" id="home">
        <div className="container">
          <div className="content-slider">
            <h1>{t("content-slider")}</h1>
            <div className="button-group">
              <a href="#services" onClick={(e) => handleClick(e, "/", "services")}>
                <button className="btn-green" data-aos="fade-up">
                  <span>{t("green_btn")}</span>
                  <div class="arrow-bg">
                    <i className="fa-solid fa-arrow-right"></i>
                  </div>
                </button>
              </a>
              <a href="/kontakt">
                <button className="btn-white" data-aos="fade-up" data-aos-delay="100">
                  <span>{t("white_btn")}</span>
                </button>
              </a>
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
          <a href="/interiery" className="service" data-aos="zoom-in" data-aos-delay="100">
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
          </a>
          <a href="/stoly" className="service" data-aos="zoom-in">
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
          </a>
        </div>
        <a href="/konfigurator" className="configurator" data-aos="zoom-in" data-aos-delay="200">
          <h3>{t("configurator_text")}</h3>
        </a>
        <div className="title">
          <h2>{t("title2")}</h2>
          <h1>{t("subtitle2")}</h1>
        </div>
        <SliderProduct />
        <div className="about-wrap" id="about" data-aos="fade-up" ref={ref}>
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
              <img src="img/image-removebg-preview 1.png" alt="Filip Zelený" />
            </div>
          </div>
          <div className="bar">
            <h3>
              {t("bar_text1")}
              {inView ? <CountUp end={50} duration={3} delay={0.5} /> : null}
              {t("let")}
            </h3>
            <h3>
              {t("bar_text2")}
              {inView ? <CountUp end={12} duration={3} delay={0.5} /> : null}
              {t("let")}
            </h3>
            <h3>
              {t("bar_text3")}
              {inView ? <CountUp end={1500} duration={3} delay={0.5} /> : null}
              {t("let")}
            </h3>
          </div>
        </div>
        <div className="title">
          <h2>{t("title5")}</h2>
          <h1>{t("subtitle5")}</h1>
        </div>
        <SliderRev />
        {/* <div className="title">
        <div className="title">
          <h2>{t("title4")}</h2>
          <h1>{t("subtitle4")}</h1>
        </div>
        <div className="video" data-aos="fade-up">
          <div className="movie">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8qN9ZWcHrvY?si=q5xGjN10-eTWHG1O&autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;autoplay;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div> 
      </div>*/}
      </div>
      <BtnUpDown />
      <Footer />
    </>
  );
}

export default App;
