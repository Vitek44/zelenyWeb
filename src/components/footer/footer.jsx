import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
export default function Footer() {
  let navigate = useNavigate();

  const scrollToId = (path, id) => {
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
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer-main">
            <a href="/" className="footer-logo">
              <img src="/img/Zeleny logo-2B.jpg" alt="DesignJJ logo" draggable="false" />
            </a>
            <h5>{t("footertext")}</h5>
            <div className="footer-text">
              <p>Filip Zelený</p>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-menu">
              <h3>{t("footer1")}</h3>
              <ul>
                <li>
                  <a onClick={() => scrollToId("/", "about")} className="link">
                    {t("nav-li1")}
                  </a>
                </li>
                <li>
                  <a href="/konfigurator" className="link">
                    {t("nav-li2")}
                  </a>
                </li>
                <li>
                  <a href="/galerie" className="link">
                    {t("nav-li3")}
                  </a>
                </li>
                <li>
                  <a href="/stoly" className="link">
                    {t("nav-li4")}
                  </a>
                </li>
                <li>
                  <a href="/interiery" className="link">
                    {t("nav-li5")}
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/kontakt", "")} className="link">
                    {t("nav-li6")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <h3>{t("contants")}</h3>
              <ul>
                <li>
                  <i className="fa-regular fa-envelope"></i>
                  <a href="" className="link" target="_blank">
                    filip-zeleny@gmail.com
                  </a>
                </li>
                <li>
                  <i className="fa-brands fa-instagram"></i>{" "}
                  <a href="https://www.instagram.com/interiery_filipzeleny/" className="link" target="_blank">
                    Filip Zelený
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="container">
          <div className="bottom-content">
            <div className="copy">
              <p>{t("right")}</p>
            </div>
            <div className="author">
              {t("created")}{" "}
              <a href="https://designjj.cz/" target="_blank">
                <img src="/img/author.webp" alt="DesignJJ" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
