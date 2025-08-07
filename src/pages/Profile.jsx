import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Profile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://project-back-3rgq.onrender.com/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (newPassword !== confirmPassword) {
      setMessage("Новый пароль и подтверждение не совпадают");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://project-back-3rgq.onrender.com/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Ошибка при смене пароля");
      } else {
        setMessage("Пароль успешно изменён");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordForm(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("Ошибка при запросе на сервер");
    }
  };

  if (loading) return <div className={styles.loading}>Загрузка...</div>;

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <h1>Вы не авторизованы</h1>
        <button 
          className={styles.loginButton}
          onClick={() => navigate("/login")}
        >
          Войти в аккаунт
        </button>
      </div>
    );
  }

  return (
    <div className={styles.profileContainer}>
      {user.avatar && (
        <img
          src={`https://project-back-3rgq.onrender.com${user.avatar}`}
          alt="avatar"
          className={styles.avatar}
        />
      )}

      <div className={styles.profileInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Имя:</span>
          <span className={styles.infoValue}>{user.username}</span>
        </div>
        
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Email:</span>
          <span className={styles.infoValue}>{user.email}</span>
        </div>
        
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Points:</span>
          <span className={styles.infoValue}>{user.points}</span>
        </div>
      </div>

      <div className={styles.buttonsContainer}>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className={styles.logoutButton}
        >
          Выйти
        </button>

        <button
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          className={styles.passwordButton}
        >
          {showPasswordForm ? "Отмена" : "Сменить пароль"}
        </button>
      </div>

      {showPasswordForm && (
        <form onSubmit={handlePasswordChange} className={styles.passwordForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Текущий пароль</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Новый пароль</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Подтвердите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.formInput}
            />
          </div>
          {message && (
            <div className={`${styles.message} ${
              message.includes("успеш") ? styles.success : styles.error
            }`}>
              {message}
            </div>
          )}
          <button type="submit" className={styles.submitButton}>
            Сменить пароль
          </button>
        </form>
      )}
    </div>
  );
}