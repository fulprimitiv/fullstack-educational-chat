import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';
import { getAIResponse } from '../../services/aiService';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        'Привет! Я цифровой тьютор УрФУ. Готов помочь вам с вопросами об университете, учебном процессе и студенческой жизни. О чём хотите узнать?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const aiText = await getAIResponse(userMessage.content, messages);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content:
          '⚠️ Произошла ошибка при обращении к ИИ. Попробуйте позже или обратитесь в поддержку.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const quickQuestions = [
    'Когда каникулы?',
    'Как получить место в общежитии?',
    'Где оплатить обучение?',
    'Где получить справку об обучении?',
    'Где находится столовая?',
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  return (
    <div className="chat-container">
      {/* Заголовок чата */}
      <div className="chat-header">
        <div className="chat-avatar">
          <img
            src="/img/ai-avatar.png"
            alt="ИИ-тьютор"
            className="avatar-image"
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/50x50/3B82F6/FFFFFF?text=AI';
            }}
          />
        </div>
        <div className="chat-info">
          <h2 className="chat-title">Цифровой тьютор УрФУ</h2>
          <p className="chat-status">{isTyping ? 'Печатает...' : 'В сети'}</p>
        </div>
      </div>

      {/* Быстрые вопросы */}
      <div className="quick-questions">
        <h3 className="quick-questions-title">Популярные вопросы:</h3>
        <div className="quick-questions-list">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              className="quick-question-btn"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Область сообщений */}
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-content">
              <p className="message-text">{message.content}</p>
              <span className="message-time">
                {formatTime(message.timestamp)}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message ai-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Поле ввода */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите ваш вопрос..."
            className="chat-input"
            rows="1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="send-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
