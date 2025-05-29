import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    // Уведомляем родительский компонент о состоянии меню
    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);

    // Уведомляем родительский компонент о закрытии меню
    if (onMobileMenuToggle) {
      onMobileMenuToggle(false);
    }
  };

  // Блокировка скролла при открытом меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    // Очистка при размонтировании
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Закрытие меню при изменении маршрута
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <img src="/img/logo.png" alt="Logo" className="company-logo" />
          </Link>
        </div>

        {/* Десктопная навигация */}
        <nav className="nav-container desktop-nav">
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              Главная
            </Link>
            <Link
              to="/rtf-map"
              className={`nav-item ${location.pathname === '/rtf-map' ? 'active' : ''}`}
            >
              Карта РТФ
            </Link>
            <Link
              to="/contacts"
              className={`nav-item ${location.pathname === '/contacts' ? 'active' : ''}`}
            >
              Контакты
            </Link>
            <Link
              to="/communities"
              className={`nav-item ${location.pathname === '/communities' ? 'active' : ''}`}
            >
              Сообщества
            </Link>
            <Link
              to="/faq"
              className={`nav-item ${location.pathname === '/faq' ? 'active' : ''}`}
            >
              FAQ
            </Link>
          </div>
        </nav>

        {/* Десктопная кнопка входа */}
        <div className="auth-section desktop-auth">
          <button className="login-btn">Войти</button>
        </div>

        {/* Кнопка мобильного меню */}
        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Мобильное меню */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
          <div className="mobile-menu-content">
            <nav className="mobile-nav">
              <Link
                to="/"
                className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Главная
              </Link>
              <Link
                to="/rtf-map"
                className={`mobile-nav-item ${location.pathname === '/rtf-map' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Карта РТФ
              </Link>
              <Link
                to="/contacts"
                className={`mobile-nav-item ${location.pathname === '/contacts' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Контакты
              </Link>
              <Link
                to="/communities"
                className={`mobile-nav-item ${location.pathname === '/communities' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Сообщества
              </Link>
              <Link
                to="/faq"
                className={`mobile-nav-item ${location.pathname === '/faq' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                FAQ
              </Link>
            </nav>
            <div className="mobile-auth">
              <button className="mobile-login-btn" onClick={closeMobileMenu}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
