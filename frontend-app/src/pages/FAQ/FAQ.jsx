import React, { useState } from 'react';
import ContentContainer from '../../components/common/ContentContainer/ContentContainer';
import './FAQ.css';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      id: 1,
      question: 'Что это за приложение и для чего оно нужно?',
      answer:
        'Это образовательная платформа для студентов УрФУ, которая объединяет новости, полезные ссылки на студенческие сообщества и интерактивного помощника. Приложение помогает студентам быть в курсе актуальных событий университета и легко находить нужную информацию.',
    },
    {
      id: 2,
      question: 'Как пользоваться навигацией?',
      answer:
        'Навигация расположена в верхней части страницы. Используйте разделы "Новости" для просмотра актуальных событий, "Сообщества" для поиска студенческих групп, "Контакты" для связи с администрацией. Активная страница выделена более ярким цветом в меню.',
    },
    {
      id: 3,
      question: 'Могу ли я использовать приложение без регистрации?',
      answer:
        'Да, большинство функций доступны без регистрации. Вы можете просматривать новости, переходить по ссылкам сообществ и пользоваться базовыми возможностями чат-помощника. Регистрация потребуется только для персонализированных функций и сохранения истории общения.',
    },
    {
      id: 4,
      question: 'Какие данные собирает приложение?',
      answer:
        'Приложение собирает минимальный объем данных: мы не собираем персональные данные без вашего согласия и не передаем информацию третьим лицам.',
    },
    {
      id: 5,
      question: 'Как задать вопрос помощнику?',
      answer:
        'Нажмите на зеленую кнопку чата в правом нижнем углу экрана. Откроется окно чат-помощника, где вы можете задать любой вопрос, связанный с учебой, университетом или студенческой жизнью. Помощник работает на базе ИИ и доступен 24/7.',
    },
  ];

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <ContentContainer title="Часто задаваемые вопросы">
      <div className="faq-container">
        {faqData.map((item) => (
          <div key={item.id} className="faq-item">
            <div className="faq-question" onClick={() => toggleItem(item.id)}>
              <span className="faq-question-text">{item.question}</span>
              <span className={`faq-arrow ${openItems[item.id] ? 'open' : ''}`}>
                ▼
              </span>
            </div>
            <div className={`faq-answer ${openItems[item.id] ? 'open' : ''}`}>
              <div className="faq-answer-content">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default FAQ;
