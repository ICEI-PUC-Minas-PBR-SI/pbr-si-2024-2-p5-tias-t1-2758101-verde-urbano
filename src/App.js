import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SustainabilitySection from './components/SustainabilitySection';
import TechInnovationSection from './components/TechInnovationSection';
import BenefitsSection from './components/BenefitsSection';
import CommunityImpactSection from './components/CommunityImpactSection';
import ImageList from './components/ImageList';
import AddProposal from './components/AddProposal'; // Componente de Adicionar Proposta
import Profile from './components/Profile';
import AuthForm from './components/AuthForm'; // Componente de Login/Cadastro
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Joao Silva',
    email: 'joao.silva@email.com',
    image: '', // Deixe vazio para testar as iniciais
  });

  const handlePageChange = (page) => {
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogin = (email, password) => {
    if (email === 'joao.silva@email.com' && password === '123456') {
      setIsAuthenticated(true);
      setCurrentPage('profile');
    } else {
      alert('Email ou senha incorretos');
    }
  };

  const handleRegister = (username, email, password) => {
    alert(`Usuário ${username} cadastrado com sucesso!`);
    setIsAuthenticated(true);
    setCurrentPage('profile');
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} user={user} />

      {currentPage === 'home' && (
        <>
          <HeroSection />
          <SustainabilitySection />
          <TechInnovationSection /> {/* Seção de Inovação Tecnológica */}
          <BenefitsSection />         {/* Seção de Benefícios para o Usuário */}
          <CommunityImpactSection />  {/* Seção de Impacto Comunitário */}
        </>
      )}

      {currentPage === 'images' && <ImageList />}
      {currentPage === 'addProposal' && <AddProposal />}
      {currentPage === 'profile' && isAuthenticated && <Profile user={user} />}
      {currentPage === 'auth' && (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}

      <Footer />
    </div>
  );
}

export default App;
