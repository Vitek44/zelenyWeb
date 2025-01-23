import React from "react";

//BrowserRouter
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubMenu from "./pages/SubMenuTable/SubMenuTable";
import Konfigurator from "./pages/configurator/configurator";

import Main from "./pages/main/home";

//css
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/podmenu" element={<SubMenu />} />
          <Route path="/konfigurator" element={<Konfigurator />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
