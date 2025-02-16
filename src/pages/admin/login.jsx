import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./login.css";

const Login = () => {
  const [loginData, setloginData] = React.useState([]);

  const getData = () => {
    fetch("https://designjj-test.eu/php/login.php")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setloginData(data);
        } else {
          console.error("Empty response from server");
        }
      })
      .catch((error) => console.error("GG eror:", error));
  };

  useEffect(() => {
    getData();
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin(); // Spustí funkci při stisknutí Enter
    }
  };

  const handleLogin = () => {
    // Akce při přihlášení (například ověření přihlašovacích údajů)
    if (loginData.some((test) => test.jmeno === username && test.heslo === password)) {
      toast.info("Přihlašovaní ...");
      setTimeout(() => {
        navigate("/admin/admin-panel");
      }, 1000); // 2 seconds delay
    } else {
      toast.error("Špatné přihlašovací údaje");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" transition:Bounce />
      <div class="login-wrapper">
        <div className="login-container">
          <input type="text" placeholder="Jméno" value={username} onChange={(e) => setUsername(e.target.value)} required onKeyDown={handleKeyDown} />
          <input type="password" placeholder="Heslo" value={password} onChange={(e) => setPassword(e.target.value)} required onKeyDown={handleKeyDown} />
          <button onClick={handleLogin}>Přihlásit se</button>
        </div>
      </div>
    </>
  );
};

export default Login;
