import React from "react";

//Navbar
import Navbar from "../../components/navbar/navbar";

//Translation
import { useTranslation } from "react-i18next";

//css
import "./SubMenuTable.css";

function SubMenu() {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="services1">
          <div className="service" onClick={() => handleLinkClick("/podmenu", "")}>
            <div className="serviceImg">
              <img src="img/01c.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service1")}</h1>
              </div>
            </div>
          </div>
          <div className="service">
            <div className="serviceImg">
              <img src="img/08d.png" alt="" />
              <div className="serviceContent">
                <h1>{t("service2")}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubMenu;
