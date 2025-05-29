import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import './styles/App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Communities from './pages/Communities/Communities';
import FAQ from './pages/FAQ/FAQ';
import Contacts from './pages/Contacts/Contacts';
import FloatingChatButton from './components/common/FloatingChatButton/FloatingChatButton';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="app-wrapper">
          <Header onMobileMenuToggle={handleMobileMenuToggle} />
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contacts" element={<Contacts />} />
            </Routes>
          </div>
          {/* Кнопка чата скрывается при открытом мобильном меню */}
          {!isMobileMenuOpen && (
            <FloatingChatButton onClick={handleChatToggle} />
          )}
        </div>
      </Router>
    </Provider>
  );
}

export default App;
