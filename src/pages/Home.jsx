// Home.jsx (изменения только в стилях, логика остается той же)
import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import createEvent from "../assets/createEvent.svg";
import loadingIcon from "../assets/loading.svg";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://project-back-3rgq.onrender.com/api/events")
      .then(res => res.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.headerBar}>
        <h1 className={styles.pageTitle}>Events</h1>
        <button
          className={styles.createBtn}
          onClick={() => navigate("/create-event")}
          aria-label="Create Event"
        >
          <img src={createEvent} alt="" className={styles.createIcon} />
          <span>Create Event</span>
        </button>
      </div>

      {loading ? (
        <div className={styles.loadingState}>
          <img src={loadingIcon} alt="Loading" className={styles.loadingIcon} />
          <p>Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No events found</p>
          <button 
            className={styles.createFirstBtn}
            onClick={() => navigate("/create-event")}
          >
            Create your first event
          </button>
        </div>
      ) : (
        <div className={styles.eventsGrid}>
          {events.map(event => (
            <div
              className={styles.eventCard}
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDesc}>{event.description}</p>
                <div className={styles.eventDate}>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div className={styles.cardOverlay}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}