import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./kontakt.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Kontakt() {
  const { t } = useTranslation();
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: 49.9387325, // Poskytnutá šířka
    lng: 15.80052, // Poskytnutá délka
  };

  const markerPosition = {
    lat: 49.9387325, // Poskytnutá šířka
    lng: 15.80052,
  };

  // Funkce se volá, když je mapa načtena
  const onLoad = () => {
    setMapLoaded(true);
  };

  const [formData, setFormData] = useState({
    jmeno: "",
    email: "",
    predmet: "",
    zprava: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    if (!formData.jmeno || !formData.email || !formData.predmet || !formData.zprava) {
      toast.error("Vyplňte všechny povinné údaje.");
      return;
    }
    fetch("https://designjj-test.eu/php/sendEmail2.php", {
      method: "POST", // Správná metoda
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Převod objektu na JSON
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Zpráva byla odeslána.");
          setFormData({
            jmeno: "",
            email: "",
            predmet: "",
            zprava: "",
          });
        } else {
          toast.error("Nepodařilo se odeslat zprávu.");
        }
      })
      .catch((err) => {
        console.error("Chyba při odesílání zprávy:", err);
      });
  };
  return (
    <>
      <ToastContainer position="bottom-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{t("title6")} | Filip Zelený</title>
          <link rel="canonical" href="https://www.filipzeleny.cz/kontakt" />
        </Helmet>
      </HelmetProvider>
      <Navbar />
      <div className="kontakt-wrapper">
        <div className="container">
          <div className="podmenu-title">
            <h1>{t("title6")}</h1>
          </div>
        </div>
        <div className="container">
          <div className="kontakt-content">
            <div className="kontakt-info">
              <div className="kontakt-item">
                <i className="fa-solid fa-user"></i>
                <h5>Filip Zelený</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-map-location-dot"></i>
                <h5>Chrudim, U Stadionu 749</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-envelope"></i>
                <h5>info@filipzeleny.cz</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-phone"></i>
                <a href="tel:+420776010780">
                  <h5>+420 776 010 780</h5>
                </a>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-address-card"></i>
                <h5>IČO: 17124344</h5>
              </div>
              <div className="kontakt-item">
                <i class="fa-brands fa-square-instagram"></i>
                <a href="https://www.instagram.com/interiery_filipzeleny/" target="_blank">
                  <h5>@filipzeleny</h5>
                </a>
              </div>
              <div className="kontakt-item">
                <i class="fa-brands fa-square-facebook"></i>
                <a href="https://www.facebook.com/people/Interi%C3%A9ry-Filip-Zelen%C3%BD/61551922541364/" target="_blank">
                  <h5>Interiéry_filipzeleny</h5>
                </a>
              </div>
            </div>
            <div class="kontakt-form">
              <h3>{t("contactMe")}</h3>
              <input type="text" name="jmeno" placeholder={t("phName")} value={formData.jmeno} onChange={handleChange} />
              <input type="text" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
              <input type="text" name="predmet" placeholder={t("phSubject")} value={formData.predmet} onChange={handleChange} />
              <textarea name="zprava" id="text" placeholder={t("phText")} value={formData.zprava} onChange={handleChange}></textarea>
              <button className="kontakt-btn" onClick={handleSend}>
                {t("send")}
              </button>
            </div>
          </div>
        </div>
        <div class="map">
          <LoadScript googleMapsApiKey="AIzaSyCyevr6cxshBwp7VCA2jwkroF5jg-GUFqY" onLoad={onLoad}>
            {mapLoaded && (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={16}
                options={{
                  mapId: "8a0e442282ecc32a", // Přidání mapId pro vlastní mapovou konfiguraci
                }} // Můžeš upravit hodnotu zoomu podle potřeby
              >
                <Marker position={markerPosition} icon="/img/map_dot.svg" />
              </GoogleMap>
            )}
          </LoadScript>
        </div>
      </div>
      <Footer />
    </>
  );
}
