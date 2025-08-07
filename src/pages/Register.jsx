import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import emailIcon from "../assets/emailIcon.svg";
import passwordIcon from "../assets/passwordIcon.svg";
import nameIcon from "../assets/nameIcon.svg";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      const res = await fetch("https://project-back-3rgq.onrender.com/api/auth/register", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка регистрации");
      login(data.user, data.token);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleRegister}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <h3 className={styles.subtitle}>If you don't have an account, <br />enter your details and create account.</h3>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Username
            <div className={styles.inputContainer}>
              <img className={styles.icon} src={nameIcon} alt="name icon" />
              <input
                className={styles.input}
                style={{}}
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="your username"
                autoFocus
              />
            </div>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Email
            <div className={styles.inputContainer}>
              <img className={styles.icon} src={emailIcon} alt="email icon" />
              <input
                className={styles.input}
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your email"
              />
            </div>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Password
            <div className={styles.inputContainer}>
              <img className={styles.icon} src={passwordIcon} alt="password icon" />
              <input
                className={styles.input}
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="your password"
              />
            </div>
          </label>
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>
            Photo profile
            <input
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={e => setAvatar(e.target.files[0])}
            />
          </label>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        
        <button type="submit" className={styles.registerBtn}>Create account</button>
        
        <div className={styles.loginLink} onClick={() => navigate("/login")}>
          <p>else you have an account login</p>
        </div>
      </form>
    </div>
  );
}