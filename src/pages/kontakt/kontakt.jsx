import React, { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./kontakt.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Kontakt() {
  const { t } = useTranslation();
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // Souřadnice pro umístění markeru
  const location = {
    lat: 49.94061279296875,
    lng: 15.798074722290039,
  };

  // Tvůj API klíč
  const apiKey = "AIzaSyCyevr6cxshBwp7VCA2jwkroF5jg-GUFqY";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{t("title6")} | Filip Zelený</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
                <h5>Chrudim, Pod Mostem 42</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-envelope"></i>
                <h5>info@filipzeleny.cz</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-phone"></i>
                <h5>+420 776 010 780</h5>
              </div>
              <div className="kontakt-item">
                <i className="fa-solid fa-address-card"></i>
                <h5>IČO: 17124344</h5>
              </div>
            </div>
            <div class="kontakt-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder={t("phName")} data-aos="fade-right" />
                  <input type="text" placeholder="E-mail" data-aos="fade-left" data-aos-delay="50" />
                  <input type="text" placeholder={t("phSubject")} data-aos="fade-right" data-aos-delay="100" />
                  <textarea name="text" id="text" placeholder={t("phText")} data-aos="fade-right" data-aos-delay="150"></textarea>
                </div>
                <div className="form-group">
                  <button className="kontakt-btn" data-aos="fade-left" data-aos-delay="200">
                    {t("send")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="map">
          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location}
              zoom={14}
              options={{
                mapId: "8a0e442282ecc32a", // Přidání mapId pro vlastní mapovou konfiguraci
              }}
            >
              {/* Marker s vlastní ikonou (zelený marker) */}
              <Marker position={location} title="My location" icon="" />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <Footer />
    </>
  );
}
