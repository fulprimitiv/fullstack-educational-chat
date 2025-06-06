import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import store from './store/store';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Communities from './pages/Communities/Communities';
import FAQ from './pages/FAQ/FAQ';
import Contacts from './pages/Contacts/Contacts';
import RTFMap from './pages/RTFMap/RTFMap';
import Chat from './pages/Chat/Chat';
import FloatingChatButton from './components/common/FloatingChatButton/FloatingChatButton';
import './styles/App.css';

function AppContent() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const location = useLocation();

  const handleMobileMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  const shouldShowChatButton = location.pathname !== '/chat';

  return (
    <div className="app-wrapper">
      <Header onMobileMenuToggle={handleMobileMenuToggle} />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/rtf-map" element={<RTFMap />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
      {shouldShowChatButton && !isMobileMenuOpen && (
        <FloatingChatButton onClick={handleChatToggle} />
      )}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        themes={['light', 'dark']}
        storageKey="app-theme"
      >
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
