import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./galerie.css";

const Reactgalerie = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Všechno");
  const [lightbox, setLightbox] = useState({ img: "", i: 0 });

  const categories = ["Všechno", "Stoly", "Interiéry", "Kuchyně", "Skříně"];

  // Základní URL pro obrázky (pokud jsou v databázi uložené relativně)

  useEffect(() => {
    const loadData = () => {
      fetch(`https://designjj-test.eu/php/getGallery.php`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            // Přemapování klíčů: cesta → src, kategorie → category
            const formattedData = data.data.map((item) => ({
              src: item.cesta,
              category: item.kategorie,
            }));
            setImages(formattedData);
          } else {
            console.error("Chyba při načítání obrázků");
          }
        })
        .catch((err) => console.error("Chyba při načítání dat:", err))
        .finally(() => setLoading(false));
    };

    loadData();
  }, []);

  // Filtrujeme obrázky podle vybrané kategorie
  const filteredImages = selectedCategory === "Všechno" ? images : images.filter((img) => img.category === selectedCategory);

  // Otevření lightboxu
  const viewImage = (img, i) => setLightbox({ img, i });

  // Navigace v lightboxu
  const imageAction = (action) => {
    let i = lightbox.i;
    if (action === "close") return setLightbox({ img: "", i: 0 });
    if (action === "next") i = i + 1 < filteredImages.length ? i + 1 : 0;
    if (action === "prev") i = i - 1 >= 0 ? i - 1 : filteredImages.length - 1;
    setLightbox({ img: filteredImages[i].src, i });
  };

  // Swipe ovládání
  const handlers = useSwipeable({
    onSwipedRight: () => imageAction("next"),
    onSwipedLeft: () => imageAction("prev"),
    onSwipedUp: () => imageAction("close"),
    onSwipedDown: () => imageAction("close"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <>
      <div className="galerie-choices">
        {categories.map((category) => (
          <button key={category} className={selectedCategory === category ? "active" : "galerie-selected"} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox.img && (
        <div className="overlay">
          <button className="close" onClick={() => imageAction("close")}>
            <i className="fa-solid fa-x"></i>
          </button>
          <button className="prev" onClick={() => imageAction("prev")}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <div {...handlers} className="swipeable-image-container">
            <img src={lightbox.img} alt="" draggable="false" />
          </div>
          <button className="next" onClick={() => imageAction("next")}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

      {/* Galerie obrázků */}
      <div className="galery">
        {loading ? (
          <p>Načítání obrázků...</p>
        ) : filteredImages.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry columnsCount={3} gutter="10px">
              {filteredImages.map((image, i) => (
                <img key={i} src={image.src} style={{ padding: "8px", width: "100%", display: "block", cursor: "pointer" }} alt="" onClick={() => viewImage(image.src, i)} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <p>Žádné obrázky v této kategorii.</p>
        )}
      </div>
    </>
  );
};

export default Reactgalerie;
