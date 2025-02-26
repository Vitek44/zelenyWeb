import React from "react";
import "./admin-navbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div class="navbar-logo">
        <a href="/">
          <img src="/img/logo-min.svg" className="logo" alt="Zeleny logo" />
        </a>
      </div>
      <ul>
        <li>
          <a href="/admin/admin-panel">
            <img src="../img/navStoly.svg" alt="" />
          </a>
        </li>
        <li>
          <a href="/admin/admin-gallery">
            <img src="../img/navImg.svg" alt="" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
