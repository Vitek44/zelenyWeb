import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scroll, setScroll] = useState(true);
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 25) {
        setScroll(true);
        console.log("scroll");
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
      <div className="container">
        <div className={scroll ? "navbar" : "navbar scroll"}>
          {/* Logo */}
          <div className="navLogo">
            <a onClick={() => handleLinkClick("/", "home")}>
              <img src="img/px_logo_site.png" className="logo" alt="Zeleny logo" />
            </a>
          </div>

          {/* Menu */}
          <div className="navMenu">
            <ul className={isOpen ? "show" : "hide"}>
              <li>
                <a onClick={() => handleLinkClick("/", "about")}>{t("nav-li1")}</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/konfigurator", "home")}>{t("nav-li2")}</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/galerie", "home")}>{t("nav-li3")}</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/stoly", "home")}>{t("nav-li4")}</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/interiery", "home")}>{t("nav-li5")}</a>
              </li>
              <li>
                <a onClick={() => handleLinkClick("/", "kontakt")}>{t("nav-li6")}</a>
              </li>
              <li>
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
