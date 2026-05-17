import React from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="image-gallery-container">
      <div className="main-image-wrapper">
        <img src={images[0]} alt="Main" className="gallery-img" />
      </div>
      
      <div className="side-images-grid">
        {images.slice(1, 5).map((img, index) => (
          <div key={index} className="side-image-wrapper">
            <img src={img} alt={`Gallery ${index + 1}`} className="gallery-img" />
          </div>
        ))}
      </div>
      
      <button className="btn-show-all">Show all photos</button>
    </div>
  );
};

export default ImageGallery;
