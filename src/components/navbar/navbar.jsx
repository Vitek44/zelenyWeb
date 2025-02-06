import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Navbar() {
  useEffect(() => {
    AOS.init({
      disable: "mobile",
      duration: 800,
    });
  }, []);
  const [scroll, setScroll] = useState(true);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 25) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const languages = [
    {
      code: "cs",
      name: "CZ",
      country_code: "cz",
    },
    {
      code: "en",
      name: "EN",
      country_code: "gb",
    },
    {
      code: "de",
      name: "DE",
      country_code: "de",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18next.language);

  const dropdownRef = useRef(null); // Reference for the dropdown menu

  // Toggle the dropdown menu on click
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setIsDropdownOpen(false);
  };

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

  // Add event listener for clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav>
      <div className={scroll ? "container" : "container scroll-wide"}>
        <div className={scroll ? "navbar" : "navbar scroll"}>
          {/* Logo */}
          <div className="navLogo" data-aos="fade-right">
            <a href="/">
              <img src="/img/px_logo_site.png" className="logo" alt="Zeleny logo" />
            </a>
          </div>

          {/* Menu */}
          <div className="navMenu">
            <ul className={isOpen ? "show" : "hide"}>
              <li data-aos="fade-down">
                <a onClick={() => handleLinkClick("/", "services")}>
                  <span data-content={t("nav-li4")}>{t("nav-li4")}</span>
                </a>
              </li>
              <li data-aos="fade-down" data-aos-delay="50">
                <a href="/konfigurator">
                  <span data-content={t("nav-li2")}>{t("nav-li2")}</span>
                </a>
              </li>
              <li data-aos="fade-down" data-aos-delay="100">
                <a href="galerie">
                  <span data-content={t("nav-li3")}>{t("nav-li3")}</span>
                </a>
              </li>
              <li data-aos="fade-down" data-aos-delay="150">
                <a onClick={() => handleLinkClick("/", "about")}>
                  <span data-content={t("nav-li1")}>{t("nav-li1")}</span>
                </a>
              </li>
              <li data-aos="fade-down" data-aos-delay="200">
                <a onClick={() => handleLinkClick("/", "kontakt")}>
                  <span data-content={t("nav-li6")}>{t("nav-li6")}</span>
                </a>
              </li>
              <li data-aos="fade-left" data-aos-delay="250">
                <div className="language-switch" ref={dropdownRef}>
                  <button className="language-button" onClick={toggleDropdown}>
                    <img src={`/img/${currentLanguage?.country_code}.svg`} alt={`${currentLanguage?.name} flag`} className="flag-img" />
                    {currentLanguage?.name.toUpperCase()}
                    <span>{isDropdownOpen ? "▲" : "▼"}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="language-dropdown">
                      {languages
                        .filter((lang) => lang.code !== i18next.language)
                        .map(({ code, name, country_code }) => (
                          <button key={code} className="dropdown-item" onClick={() => changeLanguage(code)}>
                            <img src={`/img/${country_code}.svg`} alt={`${name} flag`} className="flag-img" />
                            {name.toUpperCase()}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
          {!isOpen ? <i className="fa-solid fa-bars nav-changer" onClick={() => setisOpen(true)}></i> : <i className="fa-solid fa-xmark nav-changer" onClick={() => setisOpen(false)}></i>}
        </div>
      </div>
    </nav>
  );
}
