import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useTranslation } from "react-i18next";
import "./SliderRev.css";

const SliderRev = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      text: t("slideRev_text_1"),
      image: "img/image9.png",
      name: t("slideRev_name_1"),
    },
    {
      id: 2,
      text: t("slideRev_text_2"),
      image: "img/image9.png",
      name: t("slideRev_name_2"),
    },
    {
      id: 3,
      text: t("slideRev_text_3"),
      image: "img/image9.png",
      name: t("slideRev_name_3"),
    },
    {
      id: 4,
      text: t("slideRev_text_4"),
      image: "img/image9.png",
      name: t("slideRev_name_4"),
    },
    {
      id: 5,
      text: t("slideRev_text_5"),
      image: "img/image9.png",
      name: t("slideRev_name_5"),
    },
  ];

  return (
    <Splide
      options={{
        type: "loop",
        perPage: 3,
        arrows: false,
        pagination: true,
        pauseOnHover: true,
        autoplay: false,
        interval: 3000,
        gap: "2.5rem",
      }}
    >
      {slides.map((slide) => (
        <SplideSlide key={slide.id}>
          <div className="slideRev">
            <div className="slideRevSet">
              <div className="user-title">
                <h5>{slide.text}</h5>
              </div>
              <div className="user-group">
                <div className="starsSpace">
                  <img src={slide.image} alt="" />
                  <h2>{slide.name}</h2>
                </div>
                <div className="stars">
                  <img src="img/star-solid.svg" alt="" />
                  <img src="img/star-solid.svg" alt="" />
                  <img src="img/star-solid.svg" alt="" />
                  <img src="img/star-solid.svg" alt="" />
                  <img src="img/star-solid.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SliderRev;
