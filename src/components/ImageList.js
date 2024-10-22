import React, { useState, useEffect } from 'react';
import './ImageList.css';
import terrenoIcon from '../assets/terreno.png'; // Supondo que o ícone da página esteja na pasta assets
import terrenoBaldio1 from '../assets/terrenoBaldio1.png'; // Ícone do terreno 1
import terrenoBaldio2 from '../assets/terrenoBaldio2.png'; // Ícone do terreno 2
import terrenoBaldio3 from '../assets/terrenoBaldio3.png'; // Ícone do terreno 3

function ImageList() {
  const [images, setImages] = useState([
    { id: 1, location: 'Rua 1, Bairro A', size: '500m²', status: 'Baldio', imageUrl: terrenoBaldio1 },
    { id: 2, location: 'Rua 2, Bairro B', size: '300m²', status: 'Subutilizado', imageUrl: terrenoBaldio2 },
    { id: 3, location: 'Avenida 3, Bairro C', size: '700m²', status: 'Baldio', imageUrl: terrenoBaldio3 },
  ]);

  // Efeito de animação ao carregar
  useEffect(() => {
    const title = document.querySelector('.image-list-title');
    const subtitle = document.querySelector('.image-list-subtitle');
    const icon = document.querySelector('.image-list-icon');
    
    icon.classList.add('animate');
    title.classList.add('animate');
    subtitle.classList.add('animate');
  }, []);

  return (
    <div className="image-list-container">
      <div className="header-container">
        <img src={terrenoIcon} alt="Terreno" className="image-list-icon" />
        <div className="title-container">
          <h1 className="image-list-title">Terrenos Baldios Identificados</h1>
          <p className="image-list-subtitle">Aqui estão os terrenos baldios identificados pela nossa plataforma</p>
        </div>
      </div>

      <div className="image-list">
        {images.map((image) => (
          <div key={image.id} className="card animate-card">
            <img src={image.imageUrl} alt={image.location} className="card-image" />
            <div className="card-content">
              <h3>{image.location}</h3>
              <p><strong>Tamanho:</strong> {image.size}</p>
              <p><strong>Status:</strong> {image.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageList;
