import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { HashLink } from "react-router-hash-link";

export default function Navbar() {
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

  const scrollToId = (elementId, offset = 105) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY; // Získání pozice prvku vzhledem k dokumentu
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
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
        <div className="navbar">
          {/* Logo */}
          <div className="navLogo">
            <img src="img/px_logo_site.png" className="logo" alt="Zeleny logo" />
          </div>

          {/* Menu */}
          <div className="navMenu">
            <ul>
              <li>
                <HashLink to="/#home">{t("nav-li1")}</HashLink>
              </li>
              <li>
                <a href="#project">{t("nav-li2")}</a>
              </li>
              <li>
                <a href="#free_spaces">{t("nav-li3")}</a>
              </li>
              <li>
                <a href="#gallery">{t("nav-li4")}</a>
              </li>
              <li>
                <a href="#contact">{t("nav-li5")}</a>
              </li>
              <li>
                <a href="#neco">{t("nav-li6")}</a>
              </li>
              <li>
                <a href="#spoluprace">{t("nav-li7")}</a>
              </li>
            </ul>
          </div>

          {/* Language Switch */}
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
        </div>
      </div>
    </nav>
  );
}
