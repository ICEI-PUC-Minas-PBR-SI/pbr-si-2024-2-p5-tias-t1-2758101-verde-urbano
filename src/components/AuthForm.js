import React, { useState } from 'react';
import loginIcon from '../assets/login.png'; // Caminho para o ícone de login
import './AuthForm.css';

function AuthForm({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setUsername('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(email, password);
    } else {
      onRegister(username, email, password);
    }
  };

  return (
    <div className="auth-form-container">
      <div className={`panel ${isLogin ? 'login' : 'register'}`}>
        <div className="side-panel">
          <div className="icon-animated-container">
            <img src={loginIcon} alt="Login Icon" className="icon-animated" />
          </div>
          <h2>{isLogin ? "Bem - vindo" : "Cria sua conta"}</h2>
          <p>{isLogin ? "Acesse sua conta agora" : "Junte-se à nossa plataforma"}</p>
          <button className="toggle-btn" onClick={handleToggleForm}>
            {isLogin ? "Criar conta" : "Entrar"}
          </button>
        </div>

        <div className="form-panel">
          <h2>{isLogin ? "ENTRAR" : "CRIA SUA CONTA"}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <label>
                  <i className="icon user-icon"></i>
                  <input
                    type="text"
                    placeholder="Nome"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </label>
              </>
            )}
            <label>
              <i className="icon email-icon"></i>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <i className="icon password-icon"></i>
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="submit-btn">
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;