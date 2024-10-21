import React, { useState } from 'react';
import './UpdateImage.css';

function UpdateImage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Simulação de upload e atualização de dados
    alert('Imagem enviada com sucesso!');
    setFile(null);
  };

  return (
    <div className="update-image">
      <h2>Atualizar Imagens de Terrenos</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>Enviar Imagem</button>
    </div>
  );
}

export default UpdateImage;
