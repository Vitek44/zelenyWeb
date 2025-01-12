import React from "react";

//BrowserRouter
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/main/home";

//css
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
