import React from "react";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "./kontakt.css";

export default function Kontakt() {
  return (
    <>
      <Navbar />
      <div class="kontakt-wrapper">
        <div class="container">
          <div class="podmenu-title">
            <h1>Kontakt</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
