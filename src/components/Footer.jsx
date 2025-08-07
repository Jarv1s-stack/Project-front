import React from 'react';
import styles from './Footer.module.css';
import { useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';


  if (isAuthPage) return null;

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>О нас</h3>
          <p className={styles.footerText}>Сервис для организации мероприятий</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Контакты</h3>
          <p className={styles.footerText}>Email: support@eventapp.com</p>
          <p className={styles.footerText}>Телефон: +7 (123) 456-7890</p>
        </div>
        
        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Соцсети</h3>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialLink}>VK</a>
            <a href="#" className={styles.socialLink}>Telegram</a>
            <a href="#" className={styles.socialLink}>YouTube</a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p className={styles.copyright}>© {new Date().getFullYear()} EventApp. Все права защищены</p>
      </div>
    </footer>
  );
}