import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Nitflex by</h3>
      </div>
      <div className="footer-section contact-section">
        <div className="contact-item">
          <h4>Antoine Maurais</h4>
          <a href="https://github.com/antoineMaurais" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className="contact-item">
          <h4>Sylvain Mestre</h4>
          <a href="https://github.com/Shult" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
      <div className="footer-section">
        <p>© 2024 Copyright</p>
      </div>
    </footer>
  );
}

export default Footer;
