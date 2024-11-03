import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SustainabilitySection from './components/SustainabilitySection';
import TechInnovationSection from './components/TechInnovationSection';
import BenefitsSection from './components/BenefitsSection';
import CommunityImpactSection from './components/CommunityImpactSection';
import ImageList from './components/ImageList';
import AddProposal from './components/AddProposal';
import Profile from './components/Profile';
import AuthForm from './components/AuthForm';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Joao Silva',
    email: 'joao.silva@email.com',
    image: '',
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
          <TechInnovationSection />
          <BenefitsSection />
          <CommunityImpactSection />
        </>
      )}
      {currentPage === 'images' && <ImageList />}
      {currentPage === 'addProposal' && <AddProposal />}
      {currentPage === 'profile' && isAuthenticated && <Profile user={user} />}
      {currentPage === 'auth' && (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}
      {currentPage === 'privacy-policy' && <PrivacyPolicyPage />}
      {currentPage === 'terms-of-service' && <TermsOfServicePage onNavigate={handlePageChange} />}

      <Footer onNavigate={handlePageChange} />
    </div>
  );
}

export default App;
