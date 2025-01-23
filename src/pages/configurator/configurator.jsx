import React from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";

//css
import "./configurator.css";
import { useNavigate } from "react-router-dom";

function Konfigurator() {
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
      <div className="outofservice">
        <div className="container">
          <h1>Omlouvám se, ale konfigurátor momentálně není k dispozici.</h1>
          <p>Pro zatím využijte náš kontaktní formulář</p>
          <button className="btn-green" onClick={() => handleLinkClick("/", "kontakt")}>
            <span>Kontakt</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Konfigurator;
