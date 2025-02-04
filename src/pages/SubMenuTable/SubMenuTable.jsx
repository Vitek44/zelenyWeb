import { useState, useEffect } from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

//Translation
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//css
import "./SubMenuTable.css";

function SubMenu() {
  const [data, setData] = useState([]);

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
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
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
      <div className="stoly-main">
        <div className="container">
          <div className="stoly-title">
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
        <div className="stoly-wrapper">
          <div className="container">
            <div className="title">
              <h2>Nabídka</h2>
              <h1>{t("Product.title")}</h1>
            </div>
            <div className="stoly-contnet">
              {data.map((item) => (
                <div className="stoly-card" key={item.Id} onClick={() => handleLinkClick(`/stoly/produkt?id=${item.Id}`)} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${item.URL})` }}>
                  <div className="stol-text">
                    <h1>{item.Nazev}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubMenu;
