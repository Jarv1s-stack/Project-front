import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import styles from "../styles/ChatBox.module.css";

export default function ChatBox({ eventId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef();

  useEffect(() => {
    fetchMessages();
    // Set up polling for new messages every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [eventId]);



  const fetchMessages = async () => {
    try {
      const res = await api.get(`/messages/${eventId}`);
      setMessages(res.data);
      setLoading(false);
    } catch {
      setMessages([]);
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    try {
      await api.post(`/messages/${eventId}`, { content });
      setContent("");
      setMessages(prev => [
        ...prev, 
        {
          id: Date.now(),
          content,
          username: currentUser?.username || "You",
          isCurrentUser: true
        }
      ]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messagesContainer}>
        {loading ? (
          <div className={styles.loading}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className={styles.noMessages}>No messages yet. Be the first to chat!</div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`${styles.message} ${
                message.isCurrentUser ? styles.currentUser : styles.otherUser
              }`}
            >
              <div className={styles.messageHeader}>
                <span className={styles.username}>
                  {message.username}
                </span>
                <span className={styles.timestamp}>
                  {new Date(message.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} className={styles.bottomRef} />
      </div>

      <form onSubmit={sendMessage} className={styles.messageForm}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your message..."
          maxLength={500}
          className={styles.messageInput}
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          disabled={!content.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
}