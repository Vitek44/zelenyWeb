import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";

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
  return (
    <footer>
      <div className="container">
        <div className="footer">
          <div className="footer-main">
            <a onClick={() => scrollToId("/", "home")} className="footer-logo">
              <img src="/img/Zeleny logo-2B.jpg" alt="DesignJJ logo" draggable="false" />
            </a>
            <h5>Profesionální tvorba dřevěného nábytku na míru od návrhu až po předání. Pomůžu vám mít dobrej stůl.</h5>
            <div className="footer-text">
              <p>Filip Zelený</p>
            </div>
          </div>
          <div className="footer-content">
            <div className="footer-menu">
              <h3>Užitečné</h3>
              <ul>
                <li>
                  <a onClick={() => scrollToId("/", "about")} className="link">
                    O mně
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/konfigurator", "home")} className="link">
                    Konfigurátor
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/galerie", "home")} className="link">
                    Galerie
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/stoly", "home")} className="link">
                    Stoly
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/interiery", "home")} className="link">
                    Interiéry
                  </a>
                </li>
                <li>
                  <a onClick={() => scrollToId("/", "kontakt")} className="link">
                    Kontakt
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-menu">
              <h3>Kontakty</h3>
              <ul>
                <li>
                  <i className="fa-regular fa-envelope"></i>
                  <a href="" className="link" target="_blank">
                    filip-zeleny@gmai.com
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
              <p>2024 © DesignJJ.cz všechna práva vyhrazena.</p>
            </div>
            <div className="author">
              Vytvořil:{" "}
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
