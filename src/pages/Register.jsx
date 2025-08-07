import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import styles from "./Profile.module.css";
import avatarPlaceholder from "../assets/avatar-placeholder.png";
import logoutIcon from "../assets/logout.svg";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.profileBox}>
        <div className={styles.profileContent}>
          <div className={styles.infoHeader}>
            <img 
              src={user?.avatar || avatarPlaceholder} 
              alt="Profile" 
              className={styles.avatar}
            />
            <div className={styles.userInfo}>
              <h2 className={styles.username}>{user?.username}</h2>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
            <button 
              className={styles.logoutBtn}
              onClick={handleLogout}
              aria-label="Logout"
            >
              <img src={logoutIcon} alt="" className={styles.logoutIcon} />
              <span>Logout</span>
            </button>
          </div>

          <div className={styles.purchaseBlock}>
            <h3>Your Purchases</h3>
            {user?.purchases?.length > 0 ? (
              <ul className={styles.purchaseList}>
                {user.purchases.map((purchase, index) => (
                  <li key={index} className={styles.purchaseItem}>
                    <img 
                      src={purchase.image} 
                      alt={purchase.name} 
                      className={styles.purchaseImage}
                    />
                    <div className={styles.purchaseDetails}>
                      <p className={styles.purchaseName}>{purchase.name}</p>
                      <p className={styles.purchaseDesc}>{purchase.description}</p>
                      <div className={styles.purchaseMeta}>
                        <span>${purchase.price}</span>
                        <span>{new Date(purchase.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>No purchases yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}