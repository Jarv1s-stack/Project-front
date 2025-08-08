import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/Shop.module.css";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://project-back-3rgq.onrender.com/api/shop")
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBuy = async (itemId) => {
    setMessage("");
    try {
      const res = await fetch("https://project-back-3rgq.onrender.com/api/shop/purchase", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ itemId }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(data.message);
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.message || "Ошибка покупки");
      }
    } catch (err) {
      setMessage("Ошибка соединения");
    }
  };

  if (loading) return <div className={styles.loading}>Загрузка товаров...</div>;

  return (
    <div className={styles.shopWrapper}>
      <h1>Market</h1>
      
      {user && (
        <div className={styles.pointsBar}>
          Your Points: <span className={styles.pointsValue}>{user.points || 0}</span>
        </div>
      )}

      {message && (
        <div className={`${styles.message} ${message.includes("успеш") ? styles.success : styles.error}`}>
          {message}
        </div>
      )}

      <div className={styles.grid}>
        {items.map(item => (
          <div key={item.id} className={styles.card}>
            <img 
              src={item.image_url} 
              alt={item.name} 
              className={styles.itemImage}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <h3 className={styles.itemTitle}>{item.name}</h3>
            <p className={styles.itemDesc}>{item.description}</p>
            <div className={styles.cardFooter}>
              <span className={styles.price}>{item.price} P</span>
              <button 
                onClick={() => handleBuy(item.id)}
                className={styles.buyBtn}
                disabled={user?.points < item.price}
              >
                Shop
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;