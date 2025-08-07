import React, { useState, useContext } from "react";
import styles from "../styles/CreateEvent.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function CreateEvent() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setInfo("");
    try {
      const res = await fetch("https://project-back-3rgq.onrender.com/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, date })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Ошибка создания события");
      setInfo("Событие успешно создано!");
      setTimeout(() => navigate("/"), 1200);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create Event</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            Title Event
            <input
              type="text"
              className={styles.input}
              required
              minLength={3}
              maxLength={70}
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter event title"
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Description
            <textarea
              className={styles.textarea}
              required
              minLength={5}
              maxLength={500}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter event description"
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Start date and time
            <input
              type="datetime-local"
              className={styles.input}
              required
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </label>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {info && <div className={styles.info}>{info}</div>}

        <button type="submit" className={styles.submitBtn}>
          Create Event
        </button>
      </form>
    </div>
  );
}