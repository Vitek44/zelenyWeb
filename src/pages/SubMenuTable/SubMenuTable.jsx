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
    </>
  );
}

export default SubMenu;
