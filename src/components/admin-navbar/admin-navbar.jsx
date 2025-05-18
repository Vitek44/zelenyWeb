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
            <i className="fa-solid fa-wrench"></i>
          </a>
        </li>
        <li>
          <a href="/admin/admin-gallery">
            <i className="fa-solid fa-image"></i>
          </a>
        </li>
      </ul>
      <div class="logout">
        <li>
          <a href="https://www.filipzeleny.cz/php/logout.php">
            <i className="fa-solid fa-right-from-bracket"></i>
          </a>
        </li>
      </div>
    </nav>
  );
};

export default AdminNavbar;
