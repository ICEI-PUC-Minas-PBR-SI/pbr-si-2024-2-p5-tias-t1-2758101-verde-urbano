import React, { useState, useEffect } from 'react';
import './UpdateImage.css';
import terrenoIcon from '../assets/terreno.png'; // Ícone da página

function UpdateImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null); // Preview da imagem
  const [showModal, setShowModal] = useState(false); // Estado para controlar o popup

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      // Cria uma URL temporária para pré-visualizar a imagem
      const filePreview = URL.createObjectURL(file);
      setPreviewImage(filePreview);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Lógica de upload da imagem
      setShowModal(true); // Exibe o modal após o upload
    } else {
      alert('Por favor, escolha um arquivo antes de enviar.');
    }
  };

  const closeModal = () => {
    setShowModal(false); // Fecha o modal
    // Libera a memória associada à URL da imagem
    URL.revokeObjectURL(previewImage);
  };

  useEffect(() => {
    const title = document.querySelector('.update-image-title');
    const subtitle = document.querySelector('.update-image-subtitle');
    const icon = document.querySelector('.update-image-icon');
    
    icon.classList.add('animate');
    title.classList.add('animate');
    subtitle.classList.add('animate');
  }, []);

  return (
    <div className="update-image-container">
      <div className="header-container">
        <img src={terrenoIcon} alt="Terreno" className="update-image-icon" />
        <div className="title-container">
          <h1 className="update-image-title">Atualizar Imagens de Terrenos</h1>
          <p className="update-image-subtitle">Escolha uma nova imagem para atualizar as informações do terreno</p>
        </div>
      </div>

      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="upload-button" disabled={!selectedFile}>
          Enviar Imagem
        </button>
      </form>

      {/* Popup modal para confirmar o envio e mostrar a imagem */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Imagem Enviada</h2>
            {previewImage && <img src={previewImage} alt="Imagem Enviada" className="modal-image-preview" />}
            <p>A imagem <strong>{selectedFile.name}</strong> foi enviada com sucesso!</p>
            <button className="close-button" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateImage;
