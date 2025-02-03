import { useState, useEffect } from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//css
import "./SubMenuTable.css";

function SubMenu() {
  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
          console.log("Data:", data.data);
        } else {
          toast.error("Nepodařilo se načíst data.");
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
        toast.error("Chyba při komunikaci se serverem.");
      });
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <div class="stoly-main">
        <div class="container">
          <div class="stoly-title">
            <h1>{t("SubMenuTable.title")}</h1>
          </div>
        </div>
        <div className="container">
          <div className="services1">
            <div className="service">
              <div className="serviceContent">
                <h1 className="main-text">{t("service3")}</h1>
              </div>
            </div>
            <div className="service">
              <div className="serviceContent">
                <h1 className="main-text">{t("service4")}</h1>
              </div>
            </div>
          </div>
        </div>
        <div class="stoly-wrapper">
          <div class="container">
            <div class="title">
              <h2>Nabídka</h2>
              <h1>{t("Product.title")}</h1>
            </div>
            <div class="stoly-contnet">
              <div class="stoly-card" onClick={() => handleLinkClick("/stoly/produkt", "")}>
                <h1>Stolík žolík</h1>
              </div>
              <div class="stoly-card">
                <h1>Stolík polík</h1>
              </div>
              <div class="stoly-card">
                <h1>Stolík dolík</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
