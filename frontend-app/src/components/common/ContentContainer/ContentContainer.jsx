import React from 'react';
import './ContentContainer.css';

const ContentContainer = ({ title, children }) => {
  return (
    <div className="content-container">
      {/* Заголовок секции */}
      <div className="content-header">
        <h1 className="content-title">{title}</h1>
      </div>

      {/* Контент */}
      <div className="content-body">{children}</div>
    </div>
  );
};

export default ContentContainer;
