import React from 'react';
import './Navbar.css';
import logo from '../assets/logo2.png'; 

function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo do Projeto" />
      </div>
      <ul className="nav-links">
        <li><button onClick={() => onNavigate('home')}>Sobre Nós</button></li>
        <li><button onClick={() => onNavigate('images')}>Listagem de Imagens</button></li>
        <li><button onClick={() => onNavigate('update')}>Atualizar Imagens</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
