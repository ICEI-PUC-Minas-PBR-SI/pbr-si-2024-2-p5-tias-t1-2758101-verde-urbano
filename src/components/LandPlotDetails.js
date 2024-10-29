import React, { useEffect, useState } from 'react';
import './LandPlotDetails.css';

function LandPlotDetails({ landPlot, onBack, onSave }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableFields, setEditableFields] = useState({
        name: landPlot.name || "Nome do Terreno",  // Nome do terreno
        description: landPlot.description || "Descrição breve do terreno", // Descrição sucinta
        location: landPlot.location || "Localização não disponível",
        price: landPlot.price || "Preço não disponível",
        topography: landPlot.topography || "Topografia não disponível",
        professionalHelp: landPlot.professionalHelp || "Informação não disponível",
        neighborhood: landPlot.neighborhood || "Informação sobre vizinhança não disponível",
        soilCondition: landPlot.soilCondition || "Tipo de solo não disponível",
        legalRestrictions: landPlot.legalRestrictions || "Informação sobre limitações não disponível",
        regularization: landPlot.regularization || "Informação sobre regularização não disponível",
        latitude: landPlot.latitude || "",  // Campo adicional
        longitude: landPlot.longitude || "", // Campo adicional
        soilType: landPlot.soilType || "Tipo de solo não disponível", // Novo campo para tipo de solo
        size: landPlot.size || "Tamanho não disponível", // Novo campo para tamanho do terreno
        status: landPlot.status || "Status não disponível" // Novo campo para status
    });

    useEffect(() => {
        const title = document.querySelector('.land-plot-title');
        const subtitle = document.querySelector('.land-plot-subtitle');
        const image = document.querySelector('.land-plot-image img');
        const details = document.querySelectorAll('.detail-item');

        title.classList.add('animate');
        subtitle.classList.add('animate');
        image.classList.add('animate');
        details.forEach((item, index) => {
            setTimeout(() => item.classList.add('animate'), index * 150);
        });
    }, []);

    // Alternar modo de edição
    const toggleEdit = () => {
        if (isEditing && onSave) {
            onSave(editableFields); // Salva as informações ao sair do modo de edição
        }
        setIsEditing(!isEditing);
    };

    // Manipulador para mudanças nos campos de entrada
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    // Gerar URL para o Google Maps com base em latitude, longitude ou endereço
    const getMapUrl = () => {
        const { latitude, longitude, location } = editableFields;
        if (latitude && longitude) {
            return `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
        } else if (location) {
            return `https://www.google.com/maps?q=${encodeURIComponent(location)}&z=15&output=embed`;
        }
        return null;
    };

    return (
        <div className="land-plot-details-container">
            {/* Botão de Voltar e botão de Editar/Salvar */}
            <div className="header-buttons">
                <button onClick={onBack} className="back-button">Voltar para a Lista</button>
                <button onClick={toggleEdit} className="edit-button">
                    {isEditing ? "Salvar" : "Editar"}
                </button>
            </div>

            {/* Título (nome do terreno) e subtítulo (descrição) */}
            <h1 className="land-plot-title">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={editableFields.name}
                        onChange={handleChange}
                        placeholder="Nome do Terreno"
                    />
                ) : (
                    `Terreno: ${editableFields.name}`
                )}
            </h1>
            <p className="land-plot-subtitle">
                {isEditing ? (
                    <input
                        type="text"
                        name="description"
                        value={editableFields.description}
                        onChange={handleChange}
                        placeholder="Descrição breve do terreno"
                    />
                ) : (
                    editableFields.description
                )}
            </p>

            {/* Imagem principal do terreno */}
            <div className="land-plot-image">
                <img src={landPlot.imageUrl} alt={`Visualização do terreno ${editableFields.name}`} />
            </div>

            {/* Detalhes do terreno em duas colunas com opção de edição */}
            <section className="land-plot-details">
                <div className="detail-item">
                    <h3>Localização</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="location"
                            value={editableFields.location}
                            onChange={handleChange}
                            placeholder="Digite a localização do terreno"
                        />
                    ) : (
                        <p>{editableFields.location}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Preço</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="price"
                            value={editableFields.price}
                            onChange={handleChange}
                            placeholder="Digite o preço estimado do terreno"
                        />
                    ) : (
                        <p>{editableFields.price}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Latitude</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="latitude"
                            value={editableFields.latitude}
                            onChange={handleChange}
                            placeholder="Digite a latitude do terreno"
                        />
                    ) : (
                        <p>{editableFields.latitude || "Latitude não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Longitude</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="longitude"
                            value={editableFields.longitude}
                            onChange={handleChange}
                            placeholder="Digite a longitude do terreno"
                        />
                    ) : (
                        <p>{editableFields.longitude || "Longitude não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Tamanho</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="size"
                            value={editableFields.size}
                            onChange={handleChange}
                            placeholder="Digite o tamanho do terreno"
                        />
                    ) : (
                        <p>{editableFields.size || "Tamanho não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Status</h3>
                    {isEditing ? (
                        <input
                            type="text"
                            name="status"
                            value={editableFields.status}
                            onChange={handleChange}
                            placeholder="Digite o status do terreno"
                        />
                    ) : (
                        <p>{editableFields.status || "Status não disponível"}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Topografia</h3>
                    {isEditing ? (
                        <textarea
                            name="topography"
                            value={editableFields.topography}
                            onChange={handleChange}
                            placeholder="Descreva a topografia do terreno"
                        />
                    ) : (
                        <p>{editableFields.topography}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Ajuda Profissional</h3>
                    {isEditing ? (
                        <textarea
                            name="professionalHelp"
                            value={editableFields.professionalHelp}
                            onChange={handleChange}
                            placeholder="Indique se há assistência profissional"
                        />
                    ) : (
                        <p>{editableFields.professionalHelp}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Vizinhança</h3>
                    {isEditing ? (
                        <textarea
                            name="neighborhood"
                            value={editableFields.neighborhood}
                            onChange={handleChange}
                            placeholder="Descreva as condições da vizinhança"
                        />
                    ) : (
                        <p>{editableFields.neighborhood}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Tipo de Solo</h3>
                    {isEditing ? (
                        <textarea
                            name="soilCondition"
                            value={editableFields.soilCondition}
                            onChange={handleChange}
                            placeholder="Descreva o tipo de solo"
                        />
                    ) : (
                        <p>{editableFields.soilCondition}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Limitações Legais</h3>
                    {isEditing ? (
                        <textarea
                            name="legalRestrictions"
                            value={editableFields.legalRestrictions}
                            onChange={handleChange}
                            placeholder="Descreva as limitações do terreno"
                        />
                    ) : (
                        <p>{editableFields.legalRestrictions}</p>
                    )}
                </div>
                <div className="detail-item">
                    <h3>Regularização</h3>
                    {isEditing ? (
                        <textarea
                            name="regularization"
                            value={editableFields.regularization}
                            onChange={handleChange}
                            placeholder="Descreva a situação de regularização do terreno"
                        />
                    ) : (
                        <p>{editableFields.regularization}</p>
                    )}
                </div>
            </section>

            {/* Mapa do Google Maps com base em latitude e longitude ou endereço */}
            {getMapUrl() ? (
                <div className="map-container">
                    <iframe
                        title="Google Maps Location"
                        src={getMapUrl()}
                        frameBorder="0"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            ) : (
                <p style={{ color: '#555', marginTop: '20px' }}>Localização no mapa não disponível</p>
            )}
        </div>
    );
}

export default LandPlotDetails;
