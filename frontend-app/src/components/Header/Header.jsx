import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../store/useTheme';
import './Header.css';

const Header = ({ onMobileMenuToggle }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme, mounted } = useTheme();

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    if (onMobileMenuToggle) {
      onMobileMenuToggle(newState);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);

    if (onMobileMenuToggle) {
      onMobileMenuToggle(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

  // Показываем скелетон до монтирования
  if (!mounted) {
    return (
      <header className="app-header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo-link">
              <img src="/img/logo.png" alt="Logo" className="company-logo" />
            </div>
          </div>
          <nav className="nav-container desktop-nav">
            <div className="nav-links">
              <div className="nav-item">Главная</div>
              <div className="nav-item">Карта РТФ</div>
              <div className="nav-item">Контакты</div>
              <div className="nav-item">Сообщества</div>
              <div className="nav-item">FAQ</div>
            </div>
          </nav>
          <div className="header-right">
            <div className="theme-toggle-skeleton"></div>
          </div>
          <button className="mobile-menu-btn" disabled>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={closeMobileMenu}>
            <img src="/img/logo.png" alt="Logo" className="company-logo" />
          </Link>
        </div>

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

        <div className="header-right">
          <div className="theme-toggle-container desktop-theme">
            <div className="theme-toggle-wrapper">
              <span className="theme-icon sun-icon" title="Светлая тема">
                ☀️
              </span>
              <label className="theme-toggle" title="Переключить тему">
                <input
                  type="checkbox"
                  checked={isDark}
                  onChange={toggleTheme}
                  aria-label="Переключить тему"
                />
                <span className="slider"></span>
              </label>
              <span className="theme-icon moon-icon" title="Темная тема">
                🌙
              </span>
            </div>
          </div>
        </div>

        <button
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Открыть меню"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

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

            <div className="mobile-theme-toggle">
              <span className="theme-label">
                {isDark ? 'Темная тема' : 'Светлая тема'}
              </span>
              <div className="theme-toggle-wrapper">
                <span className="theme-icon">☀️</span>
                <label className="theme-toggle">
                  <input
                    type="checkbox"
                    checked={isDark}
                    onChange={toggleTheme}
                    aria-label="Переключить тему"
                  />
                  <span className="slider"></span>
                </label>
                <span className="theme-icon">🌙</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
