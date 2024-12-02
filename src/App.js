import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import SustainabilitySection from "./components/SustainabilitySection";
import TechInnovationSection from "./components/TechInnovationSection";
import BenefitsSection from "./components/BenefitsSection";
import CommunityImpactSection from "./components/CommunityImpactSection";
import ImageList from "./components/ImageList";
import AddProposal from "./components/AddProposal";
import Profile from "./components/Profile";
import AuthForm from "./components/AuthForm";
import Footer from "./components/Footer";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsOfServicePage from "./components/TermsOfServicePage";
import NotificationPopup from "./components/NotificationPopup"; // Importando o novo componente
import { supabase } from "./supabaseClient";
import CryptoJS from "crypto-js";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: "Teste",
    email: "teste@email.com",
    image: "",
  });
  const [notification, setNotification] = useState(null); // Estado para notificação

  const handlePageChange = (page) => {
    if (page === "profile" && !isAuthenticated) {
      setCurrentPage("auth");
    } else {
      setCurrentPage(page);
    }
  };

  const handleLogin = async (email, password) => {
    const hashedPassword = generateHash(password);

    // Busca o usuário no banco
    const { data, error } = await supabase
      .from("user")
      .select("*") // Seleciona todos os campos
      .eq("email", email)
      .eq("password", hashedPassword);

    if (error) {
      console.error("Erro ao buscar o usuário:", error);
      setNotification({ message: "Erro ao fazer login.", type: "error" });
      return;
    }

    // Verifica se o usuário existe
    if (!data || data.length === 0) {
      setNotification({
        message: "Email e/ou senha incorretos.",
        type: "error",
      });
      return;
    }

    // Extrai os dados do usuário (primeiro elemento do array)
    const loggedUser = data[0];
    // Armazena o ID do usuário no sessionStorage
    sessionStorage.setItem("user_id", loggedUser.id);
    // Define o estado com as informações do usuário
    setUser({
      name: loggedUser.name || "user", // Usa o nome do banco ou um padrão
      email: loggedUser.email,
      image: loggedUser.image || "", // Se houver imagem armazenada
    });

    setIsAuthenticated(true);
    setCurrentPage("profile");
  };

  const generateHash = (inputText) => {
    const sha1Hash = CryptoJS.SHA1(inputText).toString();
    return sha1Hash;
  };

  const validaExistenciaEmail = async (email) => {
    try {
      let { count } = await supabase
        .from("user")
        .select("*", { count: "exact", head: true })
        .eq("email", email);

      if (count > 0) {
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (username, email, password, userType) => {
    try {
      const emailExists = await validaExistenciaEmail(email);
      if (emailExists) {
        console.error("Email já cadastrado.");
        setNotification({ message: `Email já cadastrado.`, type: "error" });
        return;
      }

      const hashedPassword = generateHash(password);
      const { data, error } = await supabase.from("user").insert([
        {
          name: username,
          email: email,
          password: hashedPassword,
          user_type_id: userType,
        },
      ])
      .select();

      if (error) {
        console.error("Erro ao cadastrar o usuário:", error.message);
        setNotification({
          message: `Erro ao cadastrar o usuário: ${error.message}`,
          type: "error",
        });
        return;
      }
      if (data && data.length > 0) {
        const userId = data[0].id; // Supõe que o campo ID se chama 'id'
        sessionStorage.setItem('user_id', userId);

      setUser({ name: username, email });
      setIsAuthenticated(true);
      setCurrentPage("profile");
      setNotification({
        message: `Usuário ${username} cadastrado com sucesso!`,
        type: "success",
      });
    }
    } catch (error) {
      console.error("Erro inesperado ao cadastrar o usuário:", error);
      setNotification({
        message: `Erro inesperado ao cadastrar o usuário: ${error.message}`,
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    // Limpa informações do usuário
    setIsAuthenticated(false);
    setUser({
      name: "",
      email: "",
      image: "",
    });
    // Remove o ID do usuário do sessionStorage
    sessionStorage.removeItem("user_id");
    // Redireciona para a tela de login
    setCurrentPage("auth");
  };

  const closeNotification = () => {
    setNotification(null);
  };

  return (
    <div className="App">
      <Navbar onNavigate={handlePageChange} user={user} />

      {currentPage === "home" && (
        <>
          <HeroSection />
          <SustainabilitySection />
          <TechInnovationSection />
          <BenefitsSection />
          <CommunityImpactSection />
        </>
      )}
      {currentPage === "images" && <ImageList />}
      {currentPage === "addProposal" && <AddProposal />}
      {currentPage === "profile" && isAuthenticated && (
        <Profile user={user} onLogout={handleLogout} />
      )}
      {currentPage === "auth" && (
        <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
      )}
      {currentPage === "privacy-policy" && <PrivacyPolicyPage />}
      {currentPage === "terms-of-service" && (
        <TermsOfServicePage onNavigate={handlePageChange} />
      )}

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
