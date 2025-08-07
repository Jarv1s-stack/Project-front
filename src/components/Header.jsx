import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import profile from "../assets/profile.svg";
import createEvent from "../assets/createEvent.svg";
import shop from "../assets/shop.svg";
import burgerIcon from "../assets/burger-menu.svg";
import closeIcon from "../assets/close.svg";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = isMenuOpen ? "auto" : "hidden";
  };

  const navigateTo = (path) => {
    navigate(path);
    if (isMobile) {
      setIsMenuOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <button 
        className={styles.burgerButton}
        onClick={toggleMenu}
        aria-label="Menu"
        aria-expanded={isMenuOpen}
      >
        <img 
          src={isMenuOpen ? closeIcon : burgerIcon} 
          alt={isMenuOpen ? "Close menu" : "Open menu"} 
          className={styles.burgerIcon} 
        />
      </button>

      <nav 
        className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
        aria-hidden={!isMenuOpen && isMobile}
      >
        <button
          className={`${styles.navButton} ${isActive("/") ? styles.active : ""}`}
          onClick={() => navigateTo("/")}
          aria-label="Home"
        >
          <img src={home} alt="Home" className={styles.navIcon} />
          <span className={styles.navText}>Home</span>
        </button>
        
        <button
          className={`${styles.navButton} ${isActive("/create-event") ? styles.active : ""}`}
          onClick={() => navigateTo("/create-event")}
          aria-label="Create Event"
        >
          <img src={createEvent} alt="Create Event" className={styles.navIcon} />
          <span className={styles.navText}>Create</span>
        </button>
        
        <button
          className={`${styles.navButton} ${isActive("/shop") ? styles.active : ""}`}
          onClick={() => navigateTo("/shop")}
          aria-label="Shop"
        >
          <img src={shop} alt="Shop" className={styles.navIcon} />
          <span className={styles.navText}>Shop</span>
        </button>

        <button
          className={`${styles.navButton} ${isActive("/profile") ? styles.active : ""}`}
          onClick={() => navigateTo("/profile")}
          aria-label="Profile"
        >
          <img src={profile} alt="Profile" className={styles.navIcon} />
          <span className={styles.navText}>Profile</span>
        </button>
        
        <ThemeToggle className={styles.themeToggle} />
      </nav>

      {isMenuOpen && (
        <div 
          className={styles.overlay} 
          onClick={toggleMenu} 
          role="button" 
          aria-label="Close menu"
          tabIndex={0}
        />
      )}
    </header>
  );
}