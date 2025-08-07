import React, { useEffect, useState } from "react";
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (systemPrefersDark ? "dark" : "light");
  });

  useEffect(() => {

    document.body.className = theme;
    localStorage.setItem("theme", theme);


    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addListener(handleSystemThemeChange);

    return () => mediaQuery.removeListener(handleSystemThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-live="polite"
    >
      <img 
        src={theme === "dark" ? lightIcon : darkIcon} 
        alt={theme === "dark" ? "Light mode" : "Dark mode"} 
        className={styles.themeIcon}
        width={24}
        height={24}
      />
    </button>
  );
}