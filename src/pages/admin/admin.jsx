import React from "react";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin.css";

const Admin = () => {
  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
          console.log(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
      <AdminNavbar />
      <div className="admin-wrapper">
        <div className="container">
          <div className="admin-content">
            <a href="" class="add-card">
              <h3>Nový stůl</h3>
              <i class="fa-solid fa-plus"></i>
            </a>
            {data.map((item) => (
              <div className="stul-card">
                <img src={item.URL} alt="" />
                <div className="card-title">
                  <h3>{item.Nazev}</h3>
                  <div className="card-btns">
                    <button className="edit" title="Upravit stůl">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="delete" title="Smazat stůl">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
