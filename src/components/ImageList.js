import React, { useState, useEffect } from 'react';
import './ImageList.css';
import LandPlotDetails from './LandPlotDetails';
import terrenoIcon from '../assets/terreno.png';
import terrenoBaldio1 from '../assets/terrenoBaldio1.png';
import terrenoBaldio2 from '../assets/terrenoBaldio2.png';
import terrenoBaldio3 from '../assets/terrenoBaldio3.png';

function ImageList() {
  const [images] = useState([
    { id: 1, location: 'Rua 1, Bairro A', size: '500m²', status: 'Baldio', imageUrl: terrenoBaldio1, soilCondition: 'Arenoso', availability: true },
    { id: 2, location: 'Rua 2, Bairro B', size: '300m²', status: 'Subutilizado', imageUrl: terrenoBaldio2, soilCondition: 'Argiloso', availability: false },
    { id: 3, location: 'Avenida 3, Bairro C', size: '700m²', status: 'Baldio', imageUrl: terrenoBaldio3, soilCondition: 'Franco-arenoso', availability: true },
  ]);

  const [selectedLandPlot, setSelectedLandPlot] = useState(null);

  useEffect(() => {
    const title = document.querySelector('.image-list-title');
    const subtitle = document.querySelector('.image-list-subtitle');
    const icon = document.querySelector('.image-list-icon');

    if (!selectedLandPlot) {
      // Remove as classes de animação para reiniciar
      icon.classList.remove('animate');
      title.classList.remove('animate');
      subtitle.classList.remove('animate');

      // Força o reflow para reiniciar a animação
      void icon.offsetWidth;

      // Adiciona as classes de animação novamente
      icon.classList.add('animate');
      title.classList.add('animate');
      subtitle.classList.add('animate');
    }
  }, [selectedLandPlot]);

  const openLandPlotDetails = (landPlot) => {
    setSelectedLandPlot(landPlot);
  };

  const closeLandPlotDetails = () => {
    setSelectedLandPlot(null);
  };

  return (
    <div className="image-list-container">
      {selectedLandPlot ? (
        <LandPlotDetails landPlot={selectedLandPlot} onBack={closeLandPlotDetails} />
      ) : (
        <>
          <div className="header-container">
            <img src={terrenoIcon} alt="Ícone de Terreno" className="image-list-icon" />
            <div className="title-container">
              <h1 className="image-list-title">Terrenos Baldios Identificados</h1>
              <p className="image-list-subtitle">Aqui estão os terrenos baldios identificados pela nossa plataforma</p>
            </div>
          </div>

          <div className="image-list">
            {images.map((image) => (
              <div key={image.id} className="card animate-card" onClick={() => openLandPlotDetails(image)}>
                <img src={image.imageUrl} alt={`Terreno em ${image.location}`} className="card-image" />
                <div className="card-content">
                  <h3>{image.location}</h3>
                  <p><strong>Tamanho:</strong> {image.size}</p>
                  <p><strong>Status:</strong> {image.status}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageList;
