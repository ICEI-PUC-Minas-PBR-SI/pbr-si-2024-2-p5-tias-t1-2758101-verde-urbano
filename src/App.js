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
import NotificationPopup from './components/NotificationPopup'; // Importando o novo componente
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Teste',
    email: 'teste@email.com',
    image: '',
  });
  const [notification, setNotification] = useState(null); // Estado para notificação

  const handlePageChange = (page) => {
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogin = (email, password) => {
    if (email === 'teste@email.com' && password === '1234') {
      setIsAuthenticated(true);
      setCurrentPage('profile');
      setNotification({ message: 'Login realizado com sucesso!', type: 'success' });
    } else {
      setNotification({ message: 'Email ou senha incorretos', type: 'error' });
    }
  };

  const handleRegister = (username, email, password) => {
    setUser({ name: username, email });
    setIsAuthenticated(true);
    setCurrentPage('profile');
    setNotification({ message: `Usuário ${username} cadastrado com sucesso!`, type: 'success' });
  };

  const closeNotification = () => {
    setNotification(null);
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

      {notification && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
    </div>
  );
}

export default App;
