import React from "react";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin.css";
import { ToastContainer, toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Admin = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getGallery.php`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.data);
        } else {
        }
      })
      .catch((err) => {
        console.error("Chyba při načítání dat:", err);
      });
  };

  const [creditals, setCreditals] = useState({
    id: "",
    cesta: "",
    kategorie: "Stoly",
    popis: "",
  });
  const _changeCreditals = (e) => {
    setCreditals({ ...creditals, [e.target.name]: e.target.value });
  };
  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Nebyl vybrán žádný soubor.");
      return creditals.file ? [creditals.file].filter(Boolean) : [];
    }

    const urls = [creditals.file].filter(Boolean); // Zachování starých URL obrázků

    const newFiles = files.filter((file) => file instanceof File); // Filtrování pouze nových souborů

    for (const file of newFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://designjj-test.eu/php/postGallery.php", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.success && result.url) {
          urls.push(result.url.replace("/public_html/", "/")); // Přidání nového obrázku do seznamu
        } else {
          toast.error(result.message || "Soubor nebyl nahrán.");
        }
      } catch (error) {
        toast.error("Chyba při nahrávání obrázku.");
        console.error("Chyba:", error);
      }
    }

    return urls.slice(0, 1); // Vrátíme max. 4 obrázky (pokud je třeba limit)
  };

  const fetchData = async () => {
    const imageUrls = await handleUpload();
    if (imageUrls.length === 0) {
      toast.error("Obrázky se nepodařilo nahrát.");
      return;
    }

    fetch("https://designjj-test.eu/php/saveGallery.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...creditals,
        images: imageUrls, // Pole URL obrázků
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          loadData();
          setModalOpen(false);
          setFiles([]);
          console.log(creditals);
          toast.success("Stůl byl úspěšně uložen");
        } else {
          toast.error("Nepodařilo se uložit stůl.");
        }
      })
      .catch((err) => {
        toast.error("Chyba při ukládání do databáze.");
        console.error("Chyba při ukládání:", err);
      });
  };

  const removeGallery = (Id) => {
    if (confirm("Opravdu chcete odstranit tento text?")) {
      fetch("https://designjj-test.eu/php/removeGallery.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // 🔹 Přidej správné hlavičky
        },
        body: JSON.stringify({ id: Id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            loadData();
            toast.success("Stůl byl úspěšně smazán");
          } else {
            console.error("Chyba:", data.message);
            toast.error("Chyba: " + data.message);
            console.log(Id);
          }
        })
        .catch((err) => {
          console.error("Chyba při načítání dat:", err);
        });
    }
  };

  useEffect(() => {}, [creditals]);

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).slice(0, 1); // Omezíme na max 4 soubory
    setFiles(newFiles);
  };

  const displayedImages = files.map((file) => (file instanceof File ? URL.createObjectURL(file) : file));
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Admin panel | Filip Zelený`}</title>
          <link rel="canonical" href="hhttps://www.filipzeleny.cz/admin/admin-gallery" />
        </Helmet>
      </HelmetProvider>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <AdminNavbar />
      <div className="admin-wrapper">
        <div className="container">
          <div className="admin-content">
            <div
              className="add-card"
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <h3>Novej obrázek</h3>
              <i className="fa-solid fa-plus"></i>
            </div>
            {data.map((item) => (
              <div className="stul-card">
                <img src={item.cesta} alt="" />
                <div className="card-title">
                  <div class="card-title-content">
                    <h3>{item.popis}</h3>
                    <p>{item.kategorie}</p>
                  </div>
                  <div className="card-btns">
                    <button className="delete" title="Smazat stůl" onClick={() => removeGallery(item.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {modalOpen ? (
        <div className="modal-wrapper">
          <div className="modal">
            <div className="modal-header">
              <h3>Nový obrázek</h3>
              <button
                className="close-modal"
                onClick={() => {
                  setModalOpen(false);
                  setCreditals({});
                  setFiles([]);
                }}
                title="Zavřít okno"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <input type="text" name="popis" placeholder="Popis" value={creditals.popis} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <select name="kategorie" value={creditals?.kategorie || ""} onChange={(e) => setCreditals({ ...creditals, kategorie: e.target.value })}>
                  <option value="Stoly">Stoly</option>
                  <option value="Interiéry">Interiéry</option>
                  <option value="Kuchyně">Kuchyně</option>
                  <option value="Skříně">Skříně</option>
                </select>
              </div>
              <div className="form-group">
                <div className="file-upload">
                  <label htmlFor="fileInput" className="custom-file-label">
                    Vyberte obrázky
                  </label>
                  <input id="fileInput" type="file" name="files" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </div>
                {/* Zobrazení obrázků */}
                <div className="uploaded-images">
                  {displayedImages.map((file, index) => (
                    <img key={index} src={file} alt={`Obrázek ${index + 1}`} className="modal-img" />
                  ))}
                </div>
              </div>
              <div className="modal-btn">
                <button className="save-btn" onClick={fetchData} title="Uložit stůl">
                  Uložit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Admin;
