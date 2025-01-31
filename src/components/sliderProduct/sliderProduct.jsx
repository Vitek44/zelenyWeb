import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useTranslation } from "react-i18next";
import "./SliderProduct.css";

const SliderProduct = () => {
  const { t } = useTranslation();

  return (
    <SplideSlide>
      <div class="produkt">
        <img src="/img/08b.png" alt="" />
        <h1>Jídelní stůl Aero 190 x 90 cm</h1>
        <span>55 000,00 Kč</span>
        <button>Zobrazit</button>
      </div>
    </SplideSlide>
  );
};

export default SliderProduct;
