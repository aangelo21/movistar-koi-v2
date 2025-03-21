import AuthButtons from "../auth-buttons/AuthButtons";
import "./Header.css";
import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="header-container">
        <img
          className="header-logo"
          src="/logos/movistar-koi.webp"
          alt="Movistar KOI logo"
        />

        <nav className="header-navbar">
          <a href="/home">Inicio</a>
          <a href="/competitions">Competiciones</a>
          <a href="/sponsors">Patrocinadores</a>
          <a href="/calendar">Calendario</a>
          <div className="header-auth-buttons-container">
            <AuthButtons />
          </div>
        </nav>

        <img
          className="header-menu-icon"
          src="/icons/menu.svg"
          alt="Icon to open menu"
          onClick={toggleMenu}
        />

        {isMenuOpen && (
          <>
            <nav className="header-menu-navbar">
              <AuthButtons />
              <a href="/home">Inicio</a>
              <a href="/competitions">Competiciones</a>
              <a href="/sponsors">Patrocinadores</a>
              <a href="/calendar">Calendario</a>
            </nav>
          </>
        )}
      </div>
    </>
  );
}

export default Header;
