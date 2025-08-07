import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import logo from "../assets/logo.svg";
import home from "../assets/home.svg";
import profile from "../assets/profile.svg";
import createEvent from "../assets/createEvent.svg";
import shop from "../assets/shop.svg";

export default function Header() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer} onClick={() => navigate("/")}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <nav className={styles.nav}>
        <button
          className={styles.navButton}
          onClick={() => navigate("/")}
          aria-label="Home"
        >
          <img src={home} alt="Home" className={styles.navIcon} />
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => navigate("/create-event")}
          aria-label="Create Event"
        >
          <img src={createEvent} alt="Create Event" className={styles.navIcon} />
        </button>
        
        <button
          className={styles.navButton}
          onClick={() => navigate("/shop")}
          aria-label="Shop"
        >
          <img src={shop} alt="Shop" className={styles.navIcon} />
        </button>

        <button
          className={styles.navButton}
          onClick={() => navigate("/profile")}
          aria-label="Profile"
        >
          <img src={profile} alt="Profile" className={styles.navIcon} />
        </button>
        
        <ThemeToggle className={styles.themeToggle} />
      </nav>
    </header>
  );
}