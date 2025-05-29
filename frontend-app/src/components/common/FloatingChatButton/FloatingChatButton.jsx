import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FloatingChatButton.css';

const FloatingChatButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="floating-chat-container">
      <Link to="/chat">
        <button
          className={`floating-chat-button ${isHovered ? 'hovered' : ''}`}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label="Открыть чат"
        >
          <div className="chat-icon">
            <img
              src="/svg/chat_bubble.svg"
              alt="Chat"
              className="chat-bubble-icon"
            />
          </div>
        </button>
      </Link>

      {/* Tooltip */}
      <div className="chat-tooltip">Начать чат</div>
    </div>
  );
};

export default FloatingChatButton;
