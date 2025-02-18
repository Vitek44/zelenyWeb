import React from "react";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin.css";
import { ToastContainer, toast } from "react-toastify";

const Admin = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const loadData = () => {
    fetch(`https://designjj-test.eu/php/getProdukt.php`, {
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
    Id: "",
    nazev: "",
    material: "",
    vyska: "",
    sirka: "",
    tloustka: "",
    delka: "",
    popisCZ: "",
    popisEN: "",
    popisDE: "",
    cena: "",
    file: "",
    file2: "",
    file3: "",
    file4: "",
    typ: "",
  });
  const _changeCreditals = (e) => {
    setCreditals({ ...creditals, [e.target.name]: e.target.value });
  };
  const handleUpload = async () => {
    const urls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://designjj-test.eu/php/postImg.php", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        if (result.success) {
          const shortUrl = result.url.replace("/public_html/", "/");
          toast.success(result.message);
          urls.push(shortUrl);
          console.log("URL:", shortUrl);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Chyba při nahrávání obrázku.");
        console.error("Chyba:", error);
      }
    }

    return urls;
  };

  const fetchData = async () => {
    const imageUrls = await handleUpload();

    if (imageUrls.length === 0) {
      toast.error("Obrázky se nepodařilo nahrát.");
      return;
    }

    fetch("https://designjj-test.eu/php/saveTable.php", {
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

  const removeTable = (Id) => {
    if (confirm("Opravdu chcete odstranit tento text?")) {
      fetch("https://designjj-test.eu/php/removeTable.php", {
        method: "POST",

        body: JSON.stringify({ Id: Id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            loadData();
            toast.success("Stůl byl úspěšně smazán");
          } else {
            loadData();
            toast.success("Stůl byl úspěšně smazán");
          }
        })
        .catch((err) => {
          console.error("Chyba při načítání dat:", err);
        });
    }
  };

  const editTable = (Id) => {
    const tableData = data.find((item) => item.Id === Id);

    if (tableData) {
      setCreditals({
        nazev: tableData.Nazev,
        material: tableData.Material,
        vyska: tableData.Vyska,
        sirka: tableData.Sirka,
        tloustka: tableData.Tloustka,
        delka: tableData.Uhlopricka,
        popisCZ: tableData.Popis,
        popisEN: tableData.PopisEN,
        popisDE: tableData.PopisDE,
        cena: tableData.Cena,
        typ: tableData.Typ,
        Id: tableData.Id,
        file: tableData.URL,
        file2: tableData.URL1,
        file3: tableData.URL2,
        file4: tableData.URL3,
      });

      console.log("Data:", tableData);

      setModalOpen(true);
    } else {
      toast.error("Nepodařilo se načíst údaje o stole");
    }
  };

  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  useEffect(() => {
    loadData();
    console.log("Data:", data);
  }, []);
  return (
    <>
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
              <h3>Nový stůl</h3>
              <i className="fa-solid fa-plus"></i>
            </div>
            {data.map((item) => (
              <div className="stul-card">
                <img src={item.URL} alt="" />
                <div className="card-title">
                  <h3>{item.Nazev}</h3>
                  <div className="card-btns">
                    <button className="edit" title="Upravit stůl" onClick={() => editTable(item.Id)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="delete" title="Smazat stůl" onClick={() => removeTable(item.Id)}>
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
              <h3>Nový stůl</h3>
              <button
                className="close-modal"
                onClick={() => {
                  setModalOpen(false);
                  setCreditals({});
                }}
                title="Zavřít okno"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <input type="text" name="nazev" placeholder="Název stolu" value={creditals.nazev} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <input type="text" name="material" placeholder="Materiál" value={creditals.material} onChange={_changeCreditals} />
                <select name="typ" value={creditals?.typ || ""} onChange={(e) => setCreditals({ ...creditals, typ: e.target.value })}>
                  <option value="Hranatý">Hranatý</option>
                  <option value="Kulatý">Kulatý</option>
                </select>
              </div>
              <div className="form-group">
                <input type="number" name="vyska" placeholder="Výška stolu" value={creditals.vyska} onChange={_changeCreditals} />
                <input type="number" name="sirka" placeholder="Šířka stolu" value={creditals.sirka} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <input type="number" name="tloustka" placeholder="Tloušťka desky" value={creditals.tloustka} onChange={_changeCreditals} />
                <input type="number" name="delka" placeholder="Délka desky" value={creditals.delka} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <textarea name="popisCZ" placeholder="Popis - česky" value={creditals.popisCZ} onChange={_changeCreditals}></textarea>
              </div>
              <div className="form-group">
                <textarea name="popisEN" placeholder="Popis - anglicky" value={creditals.popisEN} onChange={_changeCreditals}></textarea>
              </div>
              <div className="form-group">
                <textarea name="popisDE" placeholder="Popis - německy" value={creditals.popisDE} onChange={_changeCreditals}></textarea>
              </div>
              <div className="form-group">
                <input type="number" name="cena" placeholder="Cena" value={creditals.cena} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <div className="file-upload">
                  <label htmlFor="fileInput" className="custom-file-label">
                    Vyberte obrázky
                  </label>
                  <input id="fileInput" type="file" name="files" multiple onChange={handleFileChange} style={{ display: "none" }} />
                </div>
                <div className="uploaded-images">{files.length > 0 ? files.map((file, index) => <img key={index} src={URL.createObjectURL(file)} alt={`Nahraný obrázek ${index + 1}`} className="modal-img" />) : <p>Žádné obrázky nejsou vybrané.</p>}</div>
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
