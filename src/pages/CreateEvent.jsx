import React, { useState, useContext } from "react";
import styles from "../styles/CreateEvent.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import EventTitleIcon from "../assets/event-title.svg";
import EventDescriptionIcon from "../assets/event-description.svg";
import EventDateIcon from "../assets/event-date.svg";

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
        <h2 className={styles.title}>Create your events <br />and publish it</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <div className={styles.labelWithIcon}>
              <img src={EventTitleIcon} alt="Title icon" className={styles.icon} />
              Title Event
            </div>
            <div className={styles.inputWithIcon}>
              <img src={EventTitleIcon} alt="Title icon" className={styles.inputIcon} />
              <input
                type="text"
                className={styles.input}
                required
                minLength={3}
                maxLength={70}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event Title"
              />
            </div>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <div className={styles.labelWithIcon}>
              <img src={EventDescriptionIcon} alt="Description icon" className={styles.icon} />
              Description
            </div>
            <div className={styles.textareaWithIcon}>
              <img src={EventDescriptionIcon} alt="Description icon" className={styles.textareaIcon} />
              <textarea
                className={styles.textarea}
                required
                minLength={5}
                maxLength={500}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Event Description"
              />
            </div>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <div className={styles.labelWithIcon}>
              <img src={EventDateIcon} alt="Date icon" className={styles.icon} />
              Start date and time
            </div>
            <div className={styles.inputWithIcon}>
              <img src={EventDateIcon} alt="Date icon" className={styles.inputIcon} />
              <input
                type="datetime-local"
                className={styles.input}
                required
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>
          </label>
        </div>

        {error && <div className={styles.error}>{error}</div>}
        {info && <div className={styles.info}>{info}</div>}

        <button type="submit" className={styles.submitBtn}>
          publish event
        </button>
      </form>
    </div>
  );
}