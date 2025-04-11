import React from "react";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/admin-navbar/admin-navbar";
import "./admin.css";
import { ToastContainer, toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";

const Admin = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [data, setData] = useState([]);

  const verifyToken = () => {
    fetch("https://designjj-test.eu/php/verify-token.php") // Nahraď cestou k PHP skriptu
      .then((response) => {
        if (!response.ok) {
          throw new Error("Chyba při načítání dat z PHP");
        }
        return response.json(); // Očekáváme JSON odpověď
      })
      .then((data) => {
        // Debugging - výpis tokenů pro ladění

        const sessionToken = data.sessionToken; // Token ze session
        const databaseToken = data.databaseToken; // Token z databáze

        // Kontrola, jestli jsou tokeny správně načteny
        if (sessionToken === undefined || databaseToken === undefined) {
          console.error("Jedna nebo obě hodnoty tokenu chybí.");
          return;
        }

        // Porovnání tokenů
        if (sessionToken === databaseToken) {
          // Tokeny se shodují – přesměrování na admin-panel
          toast.success("Přihlášení proběhlo úspěšně");
        } else {
          // Tokeny se neshodují – zůstaň na /admin/
          console.log("Tokeny se neshodují.");
          window.location.href = "/admin/";
        }
      })
      .catch((error) => {
        console.error("Chyba:", error);
        alert("Session vypršela.");
      });
  };

  useEffect(() => {
    verifyToken();
  }, []);

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
    nazevEN: "",
    nazevDE: "",
    material: "Dub",
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
    zakoupeno: "",
    typ: "Hranatý",
  });
  const _changeCreditals = (e) => {
    setCreditals({ ...creditals, [e.target.name]: e.target.value });
  };
  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Nebyl vybrán žádný soubor.");
      return creditals.file ? [creditals.file, creditals.file2, creditals.file3, creditals.file4].filter(Boolean) : [];
    }

    const urls = [creditals.file, creditals.file2, creditals.file3, creditals.file4].filter(Boolean); // Zachování starých URL obrázků

    const newFiles = files.filter((file) => file instanceof File); // Filtrování pouze nových souborů

    for (const file of newFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("https://designjj-test.eu/php/postImg.php", {
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

    return urls.slice(0, 4); // Vrátíme max. 4 obrázky (pokud je třeba limit)
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
          setCreditals({ ...creditals, file: "", file2: "", file3: "", file4: "" });
          setFiles([]);
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
    Swal.fire({
      title: "Opravdu chcete smazat tento stůl?",
      text: "Tento proces je nevratný!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#98ba49",
      cancelButtonColor: "#d33",
      confirmButtonText: "Smazat",
      cancelButtonText: "Zrušit",
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  };

  const editTable = (Id) => {
    const tableData = data.find((item) => item.Id === Id);

    if (tableData) {
      setCreditals({
        nazev: tableData.Nazev,
        nazevEN: tableData.NazevEN,
        nazevDE: tableData.NazevDE,
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
        zakoupeno: tableData.Zakoupeno,
      });

      setFiles([tableData.URL, tableData.URL1, tableData.URL2, tableData.URL3].filter(Boolean));

      setModalOpen(true);
    } else {
      toast.error("Nepodařilo se načíst údaje o stole");
    }
  };

  useEffect(() => {}, [creditals]);

  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files).slice(0, 4); // Omezíme na max 4 soubory
    setFiles(newFiles);
  };

  const displayedImages = files.map((file) => (file instanceof File ? URL.createObjectURL(file) : file));
  useEffect(() => {
    loadData();
  }, []);

  const clearFiles = async (Id) => {
    try {
      const response = await fetch("https://designjj-test.eu/php/removeImage.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Id: Id }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setFiles([]); // Vyčistí lokální state
        loadData(); // Načte nová data
        setCreditals({ ...creditals, file: "", file2: "", file3: "", file4: "" });
      } else {
        console.error("Chyba:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const [kDispozici, setKDispozici] = useState(true);

  useEffect(() => {
    setKDispozici(Number(creditals.zakoupeno) !== 1);
  }, [creditals.zakoupeno]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Admin panel | Filip Zelený`}</title>
          <link rel="canonical" href="hhttps://www.filipzeleny.cz/admin/admin-panel" />
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
                setCreditals({
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
                  typ: "",
                  file: "",
                  file2: "",
                  file3: "",
                  file4: "",
                  zakoupeno: 0,
                });
              }}
            >
              <h3>Nový stůl</h3>
              <i className="fa-solid fa-plus"></i>
            </div>
            {data.map((item) => (
              <div className="stul-card">
                <img src={item.URL} alt="" />
                <div className="card-title">
                  <div class="title-column">
                    <h3>{item.Nazev}</h3>
                    <span>{item.Zakoupeno === "1" ? "Zakoupeno" : ""}</span>
                  </div>
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
              <h3>{creditals.nazev || "Nový stůl"}</h3>
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
                <input type="text" name="nazev" placeholder="Název stolu" value={creditals.nazev} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <input type="text" name="nazevEN" placeholder="Název EN" value={creditals.nazevEN} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <input type="text" name="nazevDE" placeholder="Název DE" value={creditals.nazevDE} onChange={_changeCreditals} />
              </div>
              <div className="form-group">
                <select name="material" id="material" value={creditals?.material || ""} onChange={(e) => setCreditals({ ...creditals, material: e.target.value })}>
                  <option disabled value="">
                    -- Vybere materiál --
                  </option>
                  <option value="Dub">Dub</option>
                  <option value="Jasan">Jasan</option>
                  <option value="Ořech">Ořech</option>
                  <option value="Americký ořech">Americký ořech</option>
                  <option value="Kaštan">Kaštan</option>
                  <option value="Oliva">Oliva</option>
                  <option value="Bříza">Bříza</option>
                </select>
                <select name="typ" value={creditals?.typ || ""} onChange={(e) => setCreditals({ ...creditals, typ: e.target.value })}>
                  <option disabled value="">
                    -- Vybere materiál --
                  </option>
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
              <div class="form-group">
                <input
                  type="checkbox"
                  name="zakoupeno"
                  checked={creditals.zakoupeno === "1"}
                  onChange={(e) =>
                    _changeCreditals({
                      target: {
                        name: "zakoupeno",
                        value: e.target.checked ? "1" : "0",
                      },
                    })
                  }
                />
                <label htmlFor="zakoupeno">Zakoupeno</label>
              </div>
              <div className="form-group">
                <div className="file-upload">
                  <label htmlFor="fileInput" className="custom-file-label">
                    Vyberte obrázky
                  </label>
                  <input id="fileInput" type="file" name="files" multiple accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                </div>
                {/* Zobrazení obrázků */}
                <div className="uploaded-images">
                  {displayedImages.map((file, index) => (
                    <img key={index} src={file} alt={`Obrázek ${index + 1}`} className="modal-img" />
                  ))}
                </div>
              </div>
              <div className="modal-btn">
                <button className="delete-img" onClick={() => clearFiles(creditals.Id)}>
                  Smazat obrázky
                </button>
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
