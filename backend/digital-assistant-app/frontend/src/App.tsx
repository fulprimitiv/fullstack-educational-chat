import React from 'react';
import './App.css';
import ChatbotPage from './ChatbotPage';
import SchedulePage from './SchedulePage';
import FAQPage from './FAQPage';
import NewsPage from './NewsPage';
import ContactsPage from './ContactsPage';
import CommunitiesPage from './CommunitiesPage';
import MapPage from './MapPage';

function App() {
  const [page, setPage] = React.useState('chatbot');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Цифровой помощник студента</h1>
        <nav style={{ marginBottom: 20 }}>
          <button onClick={() => setPage('chatbot')}>Чат-бот</button>{' '}
          <button onClick={() => setPage('schedule')}>Расписание</button>{' '}
          <button onClick={() => setPage('faq')}>FAQ</button>{' '}
          <button onClick={() => setPage('news')}>Новости</button>{' '}
          <button onClick={() => setPage('contacts')}>Контакты</button>{' '}
          <button onClick={() => setPage('communities')}>Сообщества</button>{' '}
          <button onClick={() => setPage('map')}>Карта</button>
        </nav>
      </header>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
        {page === 'chatbot' && <ChatbotPage />}
        {page === 'schedule' && <SchedulePage />}
        {page === 'faq' && <FAQPage />}
        {page === 'news' && <NewsPage />}
        {page === 'contacts' && <ContactsPage />}
        {page === 'communities' && <CommunitiesPage />}
        {page === 'map' && <MapPage />}
      </main>
    </div>
  );
}

export default App;
