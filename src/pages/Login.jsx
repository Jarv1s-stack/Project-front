import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import emailIcon from "../assets/emailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg"

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://project-back-3rgq.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка входа");
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.loginBox} onSubmit={handleLogin}>
        <img className={styles.logo} src={logo} alt="" />
        <h3>If you have an account, <br />enter your details and go to the site.</h3>
        
        <div className={styles.inputContainer}>
          <label>
            Email
            <div className={styles.inputWrapper}>
              <img className={styles.icon} src={emailIcon} alt="" />
              <input
                className={styles.inputField}
                type="email"
                autoFocus
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your email"
              />
            </div>
          </label>
        </div>

        <div className={styles.inputContainer}>
          <label>
            Password
            <div className={styles.inputWrapper}>
              <img className={styles.icon} src={passwordIcon} alt="" />
              <input
                className={styles.inputField}
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="your password"
              />
            </div>
          </label>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.loginBtn}>Войти</button>
        <div className={styles.registerLink} onClick={() => navigate("/register")}>
          <p>else you don't have an account Register</p>
        </div>
      </form>
    </div>
  );
}