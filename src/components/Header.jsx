import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import profile from "../assets/profile.svg";
import createEvent from "../assets/createEvent.svg";
import shop from "../assets/shop.svg";
import burgerIcon from "../assets/burger-menu.svg"; // Добавьте иконку бургер-меню

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      {/* Бургер-иконка для мобильных */}
      <button 
        className={styles.burgerButton}
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <img src={burgerIcon} alt="Menu" className={styles.burgerIcon} />
      </button>

      {/* Основная навигация */}
      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <button
          className={styles.navButton}
          onClick={() => navigateTo("/")}
          aria-label="Home"
        >
          <img src={home} alt="Home" className={styles.navIcon} />
          <span className={styles.navText}>Home</span>
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => navigateTo("/create-event")}
          aria-label="Create Event"
        >
          <img src={createEvent} alt="Create Event" className={styles.navIcon} />
          <span className={styles.navText}>Create</span>
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => navigateTo("/shop")}
          aria-label="Shop"
        >
          <img src={shop} alt="Shop" className={styles.navIcon} />
          <span className={styles.navText}>Shop</span>
        </button>

        <button
          className={styles.navButton}
          onClick={() => navigateTo("/profile")}
          aria-label="Profile"
        >
          <img src={profile} alt="Profile" className={styles.navIcon} />
          <span className={styles.navText}>Profile</span>
        </button>
        
        <ThemeToggle className={styles.themeToggle} />
      </nav>

      {/* Затемнение фона при открытом меню */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={toggleMenu} />
      )}
    </header>
  );
}