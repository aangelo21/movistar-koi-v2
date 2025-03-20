import "./Footer.css";
import React, { useState } from "react";

function Footer() {
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const toggleTermsAndConditions = () => {
    setTermsAndConditions(!termsAndConditions);
  };

  return (
    <>
      <div className="footer-container">
        <img
          className="footer-logo"
          src="logos/movistar-koi.webp"
          alt="Movistar KOI logo"
        />
        <div className="footer-rights">
          ©2025 Movistar KOI, Todos los derechos reservados
        </div>
        <div
          className="footer-terms-and-conditions"
          onClick={toggleTermsAndConditions}
        >
          Click aquí para ver los términos y condiciones
        </div>
        <div className="footer-social-media">
          <a
            href="https://github.com/aangelo-21/movistar-koi-v2"
            target="_blank"
          >
            <img
              className="footer-github-icon"
              src="logos/github.svg"
              alt="Github icon"
            />
          </a>
          <a href="https://x.com/MovistarKOI" target="_blank">
            <img className="footer-x-icon" src="logos/x.svg" alt="X icon" />
          </a>
          <a
            href="https://www.instagram.com/movistarkoi/?hl=es"
            target="_blank"
          >
            <img
              className="footer-instagram-icon"
              src="logos/instagram.svg"
              alt="Instagram icon"
            />
          </a>
          <a
            href="https://movistar-koi-v2-86d64.web.app/sponsors-rss.xml"
            target="_blank"
          >
            <img
              className="footer-instagram-icon"
              src="logos/rss.svg"
              alt="Rss icon"
            />
          </a>
        </div>
        {termsAndConditions && (
          <div className="footer-terms-and-conditions-popup">
            <div
              className="footer-terms-and-conditions-close"
              onClick={toggleTermsAndConditions}
            >
              x
            </div>
            <h1 className="footer-terms-and-conditions-title">
              Términos y condiciones
            </h1>
            <p className="footer-terms-and-conditions-content">
              Al utilizar el sitio web de Movistar KOI Esports Club, aceptas que el contenido es para uso personal y no comercial, y que todo el contenido es propiedad de Movistar KOI o sus licenciantes. Consulta nuestra Política de Privacidad para más información sobre cómo manejamos tus datos. Nos reservamos el derecho de modificar estos términos en cualquier momento. Estos términos se rigen por las leyes de España. Gracias por visitar Movistar KOI.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Footer;
