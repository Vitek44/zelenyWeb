import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import "./galerie.css";

const categories = ["Všechno", "Stoly", "Interiéry", "Cvrkec", "Smrkec"];

const images = [
  { src: "../../img/01c.png", category: "Stoly" },
  { src: "../../img/kuchyn.png", category: "Smrkec" },
  { src: "../../img/01c.png", category: "Stoly" },
  { src: "../../img/01c.png", category: "Stoly" },
  { src: "../../img/08d.png", category: "Cvrkec" },
  { src: "../../img/kuchyn.png", category: "Smrkec" },
  { src: "../../img/kuchyn.png", category: "Smrkec" },
  { src: "../../img/01c.png", category: "Stoly" },
  { src: "../../img/08b.png", category: "Cvrkec" },
  { src: "../../img/skrin.png", category: "Stoly" },
  { src: "../../img/intereiery.webp", category: "Interiéry" },
  { src: "../../img/intereiery.webp", category: "Interiéry" },
  { src: "../../img/08b.png", category: "Cvrkec" },
  { src: "../../img/08a.png", category: "Interiéry" },
  { src: "../../img/08b.png", category: "Cvrkec" },
  { src: "../../img/intereiery.webp", category: "Interiéry" },
  { src: "../../img/08b.png", category: "Cvrkec" },
  { src: "../../img/intereiery.webp", category: "Interiéry" },
  { src: "../../img/kuchyn.png", category: "Smrkec" },
  { src: "../../img/08b.png", category: "Cvrkec" },
  { src: "../../img/08b.png", category: "Cvrkec" },
];

const Reactgalerie = () => {
  const [data, setData] = useState({ img: "", i: 0 });
  const [selectedCategory, setSelectedCategory] = useState("Všechno");

  // Filtruje obrázky podle vybrané kategorie
  const filteredImages = selectedCategory === "Všechno" ? images : images.filter((img) => img.category === selectedCategory);

  const viewImage = (img, i) => {
    setData({ img, i });
  };

  const imageAction = (action) => {
    let i = data.i;
    if (action === "close") {
      setData({ img: "", i: 0 });
      return;
    }
    if (action === "next") {
      i = i + 1 < filteredImages.length ? i + 1 : 0;
    }
    if (action === "prev") {
      i = i - 1 >= 0 ? i - 1 : filteredImages.length - 1;
    }
    setData({ img: filteredImages[i].src, i });
  };

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

      {data.img && (
        <div className="overlay">
          <button className="close" onClick={() => imageAction("close")}>
            <i className="fa-solid fa-x"></i>
          </button>
          <button className="prev" onClick={() => imageAction("prev")}>
            <i className="fa-solid fa-less-than"></i>
          </button>
          <div {...handlers} className="swipeable-image-container">
            <img src={data.img} alt="" draggable="false" />
          </div>
          <button className="next" onClick={() => imageAction("next")}>
            <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      )}

      <div className="galery">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {filteredImages.map((image, i) => (
              <img key={i} src={image.src} style={{ padding: "8px", width: "100%", display: "block", cursor: "pointer" }} alt="" onClick={() => viewImage(image.src, i)} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default Reactgalerie;
