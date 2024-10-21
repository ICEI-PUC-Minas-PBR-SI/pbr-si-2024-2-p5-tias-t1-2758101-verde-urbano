import React, { useState } from 'react';
import './ImageList.css';

function ImageList() {
  const [images] = useState([
    { id: 1, location: 'Rua 1, Bairro A', size: '500m²', status: 'Baldio', imageUrl: 'image1.png' },
    { id: 2, location: 'Rua 2, Bairro B', size: '300m²', status: 'Subutilizado', imageUrl: 'image2.png' },
  ]);

  return (
    <div className="image-list">
      <h2>Terrenos Identificados</h2>
      <ul>
        {images.map((image) => (
          <li key={image.id}>
            <img src={image.imageUrl} alt={image.location} />
            <div>
              <h3>{image.location}</h3>
              <p>Tamanho: {image.size}</p>
              <p>Status: {image.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageList;
