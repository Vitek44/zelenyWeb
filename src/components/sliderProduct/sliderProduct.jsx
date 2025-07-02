import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { useTranslation } from "react-i18next";
import "./SliderProduct.css";
import { useNavigate } from "react-router-dom";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import i18next from "i18next";

const SliderProduct = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

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

  const loadData = () => {
    fetch(`https://filipzeleny.cz/php/sliderProdukt.php`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        } else {
          console.error("Chyba při načítání dat");
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const formatCena = (cena) => {
    return cena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <Splide
      options={{
        perPage: 3,
        perMove: 1,
        gap: "3rem",
        pagination: true,
        breakpoints: {
          768: {
            perPage: 1,
            gap: "1rem",
            arrows: false,
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
    >
      {data.map((item, index) => (
        <SplideSlide>
          <div className="stoly-card">
            <img src={item.URL} alt={item.Nazev} onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} />
            <div className="stoly-text">
              <h1>{i18next.language === "de" ? item.NazevDE : i18next.language === "en" ? item.NazevEN : item.Nazev}</h1>
              <p>
                <p>
                  {t(item.Material)} | {item.Vyska}x{item.Sirka} cm
                </p>
              </p>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SliderProduct;
