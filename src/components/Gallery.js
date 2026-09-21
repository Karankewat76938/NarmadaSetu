import React from "react";

const Gallery = () => {

  const images = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1526779259212-939e64788e3c",
  
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  ];

  return (
    <section className="gallery">
      <div className="container">
        <h2>Experience Narmada</h2>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <div className="gallery-card" key={index}>
              <img src={img} alt="gallery"/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;