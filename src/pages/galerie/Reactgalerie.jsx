import { useState } from "react";
import { useSwipeable } from "react-swipeable";

// Galerie
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Lightbox
import { SlideshowLightbox } from "lightbox.js-react";

// Swiping
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./galerie.css";

const images = ["../../img/01c.png", "../../img/08a.png", "../../img/08d.png", "../../img/kuchyn.png", "../../img/skrin.png", "../../img/intereiery.webp", "../../img/08b.png"];

const Reactgalerie = () => {
  const [data, setData] = useState({ img: "", i: 0 });

  const viewImage = (img, i) => {
    setData({ img, i });
  };

  const imageAction = (action) => {
    let i = data.i;
    if (action === "close") {
      setData({ img: "", i: 0 });
    }
    if (action === "next") {
      i = i + 1 < images.length ? i + 1 : 0;
      setData({ img: images[i], i });
    }
    if (action === "prev") {
      i = i - 1 >= 0 ? i - 1 : images.length - 1;
      setData({ img: images[i], i });
    }
  };

  // Swipeable settings for overlay
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
      {data.img && (
        <div className="overlay">
          <button className="close" onClick={() => imageAction("close")}>
            <i className="fa-solid fa-x"></i>
          </button>
          <button className="prev" onClick={() => imageAction("prev")}>
            <i className="fa-solid fa-less-than"></i>
          </button>
          {/* Swipeable image */}
          <div {...handlers} className="swipeable-image-container" style={{ userSelect: "none", touchAction: "none" }}>
            <img src={data.img} alt="" draggable="false" translate="transform" style={{ userSelect: "none" }} />
          </div>
          <button className="next" onClick={() => imageAction("next")}>
            <i className="fa-solid fa-greater-than"></i>
          </button>
        </div>
      )}

      <div className="galery">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry columnsCount={3} gutter="10px">
            {images.map((image, i) => (
              <img key={i} src={image} style={{ padding: "8px", width: "100%", display: "block", cursor: "pointer" }} alt="" onClick={() => viewImage(image, i)} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </>
  );
};

export default Reactgalerie;
