import React, { useState, useEffect } from 'react';
import './AddProposal.css';
import terrenoIcon from '../assets/proposta.png'; // Ícone da página

function AddProposal() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // Preview da imagem
    const [showModal, setShowModal] = useState(false); // Estado para controlar o popup
    const [proposalDescription, setProposalDescription] = useState('');
    const [areaSize, setAreaSize] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const filePreview = URL.createObjectURL(file);
            setPreviewImage(filePreview);
        }
    };

    const handleUpload = (event) => {
        event.preventDefault();
        if (selectedFile) {
            setShowModal(true); // Exibe o modal após o envio
        } else {
            alert('Por favor, escolha um arquivo antes de enviar.');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        URL.revokeObjectURL(previewImage);
    };

    useEffect(() => {
        const title = document.querySelector('.add-proposal-title');
        const subtitle = document.querySelector('.add-proposal-subtitle');
        const icon = document.querySelector('.add-proposal-icon');

        icon.classList.add('animate');
        title.classList.add('animate');
        subtitle.classList.add('animate');
    }, []);

    return (
        <div className="add-proposal-container">
            <div className="header-container">
                <img src={terrenoIcon} alt="Terreno" className="add-proposal-icon" />
                <div className="title-container">
                    <h1 className="add-proposal-title">Adicionar Proposta para Terreno Baldio</h1>
                    <p className="add-proposal-subtitle">Descreva sua proposta para o terreno e anexe uma imagem</p>
                </div>
            </div>

            <div className="main-container">
                {/* Coluna da imagem */}
                <div className="image-preview-container">
                    {previewImage && <h3>Pré-visualização da Imagem</h3>}
                    {previewImage ? (
                        <img src={previewImage} alt="Pré-visualização da Proposta" />
                    ) : null}
                    <div className="file-input-container">
                        <label className="file-input-label" htmlFor="file-upload">Escolher Imagem</label>
                        <input
                            type="file"
                            id="file-upload"
                            className="file-input"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Coluna dos campos de entrada */}
                <div className="form-container">
                    <form onSubmit={handleUpload} className="proposal-form">
                        <textarea
                            placeholder="Descrição da Proposta"
                            value={proposalDescription}
                            onChange={(e) => setProposalDescription(e.target.value)}
                            required
                            className="textarea-input"
                        />
                        <input
                            type="text"
                            placeholder="Localização - Área do Terreno (em m²)"
                            value={areaSize}
                            onChange={(e) => setAreaSize(e.target.value)}
                            required
                            className="text-input"
                        />
                        <textarea
                            placeholder="Informações Adicionais"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="textarea-input"
                        />
                        <button type="submit" className="submit-button" disabled={!selectedFile}>
                            Enviar Proposta
                        </button>
                    </form>
                </div>
            </div>

            {/* Modal de confirmação de envio */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Proposta Enviada</h2>
                        {previewImage && <img src={previewImage} alt="Imagem Enviada" className="modal-image-preview" />}
                        <p>A imagem <strong>{selectedFile.name}</strong> foi enviada com sucesso!</p>
                        <button className="close-button" onClick={closeModal}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddProposal;
