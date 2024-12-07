// src/components/Footer.js
import React from "react";
import "./Footer.css"; // Si vous avez un fichier CSS pour le style du footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">À propos</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Mentions légales</a>
        </div>
        <div className="footer-socials">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div className="footer-copy">
          <p>
            &copy; {new Date().getFullYear()} ShopSpace. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
