import React from 'react';
import ContentContainer from '../common/ContentContainer/ContentContainer';
import './NewsComponent.css';

const NewsComponent = () => {
  const newsData = [
    {
      id: 1,
      image: '/img/unit-hack.png',
      date: '10 апреля 2025',
      title: 'Хакатон UNIT.HACK',
      description:
        'Студенческое IT-объединение ЮНИТ приглашает принять участие в третьем межвузовском хакатоне UNIT.HACK 2025',
      link: 'https://unit-ekb.ru/',
    },
    {
      id: 2,
      image: '/img/reception.png',
      date: '18 апреля 2025',
      title: 'В самом разгаре набор на цифровую кафедру',
      description:
        'Более 20 программ — от гейм-дизайна до работы с 1С:Предприятие — предоставлено для выбора второкурсникам вуза.',
      link: 'https://urfu.ru/ru/news/54880/',
    },
    {
      id: 3,
      image: '/img/face.jpeg',
      date: '14 апреля 2025',
      title: 'Лица УрФУ Выпускной: твой выход',
      description:
        'Приготовьтесь к самому яркому событию лета! 28 июня в 22:00 Теле-клуб распахнет свои двери для единственной официальной вечеринки Уральского федерального!',
      link: 'https://tele-club.ru/teleclub/litsa-urfu-vypusknoy-tvoy-vykhod',
    },
  ];

  const handleReadMore = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <ContentContainer title="Новости">
      <div className="news-grid">
        {newsData.map((news) => (
          <div key={news.id} className="news-card">
            <img
              src={news.image}
              alt={news.title}
              className="news-image"
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/300x200/4A6BFF/FFFFFF?text=Новость+' +
                  news.id;
              }}
            />
            <div className="news-date">{news.date}</div>
            <h3 className="news-event-title">{news.title}</h3>
            <p className="news-description">{news.description}</p>
            <div
              className="news-read-more"
              onClick={() => handleReadMore(news.link)}
            >
              Читать далее →
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default NewsComponent;
