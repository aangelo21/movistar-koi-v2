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
        <img
          className="header-menu-icon"
          src="/icons/menu.svg"
          alt="Icon to open menu"
          onClick={toggleMenu}
        />

        <nav className="header-navbar">
          <a href="/home">Inicio</a>
          <a href="/home">Competiciones</a>
          <a href="/home">Calendario</a>
          <a href="/home">Sobre Nosotros</a>
        </nav>

        {isMenuOpen && (
          <nav className="header-menu-navbar">
            <a href="/home">Inicio</a>
            <a href="/home">Competiciones</a>
            <a href="/home">Calendario</a>
            <a href="/home">Sobre Nosotros</a>
          </nav>
        )}
      </div>
    </>
  );
}

export default Header;
