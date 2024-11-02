import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SustainabilitySection from './components/SustainabilitySection';
import ImageList from './components/ImageList';
import AddProposal from './components/AddProposal'; // Alteração para importar o novo componente
import Profile from './components/Profile';
import AuthForm from './components/AuthForm'; // Componente de Login/Cadastro
import Footer from './components/Footer';
import './App.css';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://xedmqngqukfopguebmtl.supabase.co/", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlZG1xbmdxdWtmb3BndWVibXRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3NDU0MTEsImV4cCI6MjA0MzMyMTQxMX0.PMUYLGgKqN7MiLQusJexnlydJ4Ywtobb_b2Q8lEKyjk");

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.com',
    image: '', // Deixe vazio para testar as iniciais
  });

  const handlePageChange = (page) => {
    // Redireciona para a tela de login/cadastro se o usuário não estiver autenticado e tentar acessar o perfil
    if (page === 'profile' && !isAuthenticated) {
      setCurrentPage('auth');
    } else {
      setCurrentPage(page);
    }
  };

  // Função para login (simulada)
  const handleLogin = (email, password) => {
    // Simulação de autenticação
    if (email === 'joao.silva@email.com' && password === '123456') {
      setIsAuthenticated(true);
      setCurrentPage('profile'); // Redireciona para o perfil após login
    } else {
      alert('Email ou senha incorretos');
    }
  };

  // Função para registro (simulada)
  const handleRegister = (username, email, password) => {
    // Lógica de registro simulada
    alert(`Usuário ${username} cadastrado com sucesso!`);
    setIsAuthenticated(true);
    setCurrentPage('profile'); // Redireciona para o perfil após registro
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} user={user} />

      {currentPage === 'home' && (
        <>
          <HeroSection />
          <SustainabilitySection />
        </>
      )}
      {currentPage === 'images' && <ImageList />}
      {currentPage === 'addProposal' && <AddProposal />} {/* Página para adicionar proposta */}
      {currentPage === 'profile' && isAuthenticated && <Profile user={user} />}
      {currentPage === 'auth' && (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}

      <Footer />
    </div>
  );
}

export default App;
