import React, { useEffect, useState, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import ChatBox from "../components/ChatBox";
import styles from "../styles/EventDetail.module.css";
import axios from "axios";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  let actualUser = authContext?.user;
  if (actualUser?.user) actualUser = actualUser.user;

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState("");

  const isParticipant = useMemo(() => {
    if (!event?.participants || !actualUser) return false;
    const userId = String(actualUser.id ?? actualUser.user_id ?? actualUser._id);
    return event.participants
      .map(p => String(p.id ?? p.user_id ?? p._id))
      .includes(userId);
  }, [event, actualUser]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://project-back-3rgq.onrender.com/api/events/${id}`);
      setEvent(response.data);
    } catch (err) {
      console.error("Ошибка при загрузке события:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleJoin = async () => {
    setJoinStatus("");
    try {
      await api.post(`/events/${id}/join`)
      setJoinStatus("Вы успешно присоединились к событию.");
      await fetchEvent();
    } catch (err) {
      setJoinStatus(
        err.response?.status === 400
          ? "Вы уже участвуете в этом событии."
          : "Ошибка при присоединении. Попробуйте позже."
      );
    }
  };

  const handleLeave = async () => {
    setJoinStatus("");
    try {
      await api.delete(`/events/${id}/leave`)
      setJoinStatus("Вы успешно вышли из события.");
      await fetchEvent();
    } catch (err) {
      setJoinStatus(
        err.response?.status === 400
          ? "Вы не участвуете в этом событии."
          : "Ошибка при выходе из события. Попробуйте позже."
      );
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/other/${userId}`);
  };

  if (loading) return <p className={styles.loading}>Загрузка события…</p>;
  if (!event) return <p className={styles.error}>Событие не найдено.</p>;

  return (
    <div className={styles.container}>
      <div className={styles.eventHeader}>
        <h1 className={styles.title}>{event.title}</h1>
        <p className={styles.description}>{event.description}</p>
      </div>

      {joinStatus && <p className={styles.status}>{joinStatus}</p>}

      <div className={styles.mainContent}>
        <div className={styles.participantsSection}>
          <div className={styles.participantsHeader}>
            <h3>Участники ({event.participants?.length || 0}):</h3>
            <button
              onClick={isParticipant ? handleLeave : handleJoin}
              className={`${styles.actionBtn} ${
                isParticipant ? styles.leaveBtn : styles.joinBtn
              }`}
            >
              {isParticipant ? "Выйти" : "Присоединиться"}
            </button>
          </div>

          {event.participants?.length > 0 ? (
            <ul className={styles.participantsList}>
              {event.participants.map(participant => {
                const isMe = String(participant.id) === String(actualUser.id);
                return (
                  <li
                    key={participant.id}
                    className={styles.participantItem}
                    onClick={() => handleUserClick(participant.id)}
                  >
                    {participant.username}
                    {isMe && <span className={styles.you}>(вы)</span>}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.noParticipants}>Нет участников</p>
          )}
        </div>

        <div className={styles.chatSection}>
          <ChatBox eventId={id} currentUser={actualUser} />
        </div>
      </div>
    </div>
  );
}