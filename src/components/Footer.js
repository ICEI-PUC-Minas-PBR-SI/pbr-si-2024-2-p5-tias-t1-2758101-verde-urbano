import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section contact-info">
          <h4>Contato</h4>
          <p>Email: contato@verdeurbano.com</p>
          <p>Telefone: (11) 1234-5678</p>
          <p>Endereço: Rua das Árvores, 123, Belo Horizonte, MG</p>
        </div>
        <div className="footer-section about">
          <h4>Sobre Nós</h4>
          <p>
            O projeto Verde Urbano visa identificar e revitalizar terrenos baldios
            em áreas urbanas, promovendo sustentabilidade e bem-estar social.
          </p>
        </div>
        <div className="footer-section links">
          <h4>Links Importantes</h4>
          <ul>
            <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
            <li><a href="/termos-de-servico">Termos de Serviço</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Verde Urbano - Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
