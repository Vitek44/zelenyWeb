import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useTranslation } from "react-i18next";
import "./Slider.css";

const Slider = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      image: "img/08b.png",
      title: t("slide_title_1"),
      text: t("slide_text_1"),
      buttonText1: t("button1_text_1"),
      buttonText2: t("button2_text_1"),
      buttonAction1: () => alert(t("button_action_1")),
      buttonAction2: () => alert(t("button_action_2")),
    },
    {
      id: 2,
      image: "img/01c.png",
      title: t("slide_title_2"),
      text: t("slide_text_2"),
      buttonText1: t("button1_text_2"),
      buttonText2: t("button2_text_2"),
      buttonAction1: () => alert(t("button_action_1")),
      buttonAction2: () => alert(t("button_action_2")),
    },
    {
      id: 3,
      image: "img/08a.png",
      title: t("slide_title_3"),
      text: t("slide_text_3"),
      buttonText1: t("button1_text_3"),
      buttonText2: t("button2_text_3"),
      buttonAction1: () => alert(t("button_action_1")),
      buttonAction2: () => alert(t("button_action_2")),
    },
    {
      id: 4,
      image: "img/skrin.png",
      title: t("slide_title_4"),
      text: t("slide_text_4"),
      buttonText1: t("button1_text_4"),
      buttonText2: t("button2_text_4"),
      buttonAction1: () => alert(t("button_action_1")),
      buttonAction2: () => alert(t("button_action_2")),
    },
    {
      id: 5,
      image: "img/kuchyn.png",
      title: t("slide_title_5"),
      text: t("slide_text_5"),
      buttonText1: t("button1_text_5"),
      buttonText2: t("button2_text_5"),
      buttonAction1: () => alert(t("button_action_1")),
      buttonAction2: () => alert(t("button_action_2")),
    },
  ];

  return (
    <Splide
      options={{
        type: "loop",
        perPage: 1,
        arrows: true,
        pagination: true,
        pauseOnHover: true,
        autoplay: true,
        interval: 3000,
      }}
    >
      {slides.map((slide) => (
        <SplideSlide key={slide.id}>
          <div
            className="slide"
            style={{
              backgroundImage: `url(${slide.image})`,
              minHeight: "100Vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container">
              <div className="content-slider">
                <h1>{slide.title}</h1>
                <h2>{slide.text}</h2>
                <div className="button-group">
                  <button className="btn-white" onClick={slide.buttonAction1}>
                    {slide.buttonText1}
                  </button>
                  <button className="btn-green" onClick={slide.buttonAction2}>
                    {slide.buttonText2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default Slider;
