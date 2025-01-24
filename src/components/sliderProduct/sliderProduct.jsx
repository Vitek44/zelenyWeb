import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useTranslation } from "react-i18next";
import "./SliderProduct.css";

const SliderProduct = () => {
  const { t } = useTranslation();

  const slides = [
    {
      id: 1,
      text: t("slideProduct_text_1"),
      image: "img/01cbg.png",
      description: t("description1"),
      warehouse: t("warehouse1"),
      button: t("productBtn_1"),
    },
    {
      id: 2,
      text: t("slideProduct_text_1"),
      image: "img/01cbg.png",
      description: t("description1"),
      warehouse: t("warehouse1"),
      button: t("productBtn_1"),
    },
    {
      id: 3,
      text: t("slideProduct_text_1"),
      image: "img/01cbg.png",
      description: t("description1"),
      warehouse: t("warehouse1"),
      button: t("productBtn_1"),
    },
    {
      id: 4,
      text: t("slideProduct_text_1"),
      image: "img/01cbg.png",
      description: t("description1"),
      warehouse: t("warehouse1"),
      button: t("productBtn_1"),
    },
    {
      id: 5,
      text: t("slideProduct_text_1"),
      image: "img/01cbg.png",
      description: t("description1"),
      warehouse: t("warehouse1"),
      button: t("productBtn_1"),
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
        autoplay: true,
        interval: 3000,
        gap: 20,
      }}
    >
      {slides.map((slide) => (
        <SplideSlide key={slide.id}>
          <div className="product">
            <div className="productImg">
              <img src={slide.image} alt="" />
            </div>
            <div className="productContent">
              <div className="productTitle">
                <h2>{slide.text}</h2>
                <h3>{slide.description}</h3>
              </div>
              <button>{slide.button}</button>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SliderProduct;
