import React from 'react';
import './Profile.css';

function Profile({ user, onEdit }) {
  return (
    <div className="profile-container">
      <h1>Perfil do Usuário</h1>
      <div className="profile-card">
        <img src={user.image || '/path/to/default-avatar.jpg'} alt="Foto do Usuário" className="profile-image" />
        <div className="profile-info">
          <h2>{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={onEdit} className="edit-button">Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
