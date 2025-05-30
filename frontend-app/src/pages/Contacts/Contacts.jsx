import React from 'react';
import ContentContainer from '../../components/common/ContentContainer/ContentContainer';
import './Contacts.css';

const Contacts = () => {
  const contactsData = [
    {
      id: 1,
      category: 'Деканат',
      name: 'Центральный учебный офис',
      description:
        'Основные вопросы по учебному процессу, расписанию, зачеткам',
      address: ' ул. Мира 19, каб. 123',
      phone: '+7 (343) 375-41-22',
      hours: 'Пн-Пт 9:00-18:00',
    },
    {
      id: 2,
      category: 'Техподдержка',
      name: 'Центр цифровых технологий',
      description: 'Помощь с личным кабинетом, почтой, Wi-Fi',
      address: ' ул. Мира 19, каб. 456',
      hours: 'Круглосуточно',
      phone: '+7 (343) 227-20-70',
    },
    {
      id: 3,
      category: 'Библиотека',
      name: 'Научная библиотека УрФУ',
      address: 'ул. Тургенева 4',
      hours: 'Пн-Сб 9:00-21:00',
      phone: '+7 (343) 350-75-65',
    },
    {
      id: 4,
      category: 'Медицинская помощь',
      name: 'Студенческая поликлиника',
      address: 'ул. Комсомольская 59б',
      hours: 'Пн-Пт 8:00-18:00, Сб-Вс выходной',
      phone: '+7 (343) 375-94-78',
    },
    {
      id: 5,
      category: 'Общежития',
      name: 'Управление студгородком',
      description: 'Вопросы по заселению, проживанию',
      address: 'ул. 8 Марта 62',
      hours: 'Пн-Пт 9:00-18:00',
      phone: '+7 (343) 251-77-40',
    },
  ];

  const handlePhoneClick = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <ContentContainer title="Важные контакты для студентов">
      <div className="contacts-grid">
        {contactsData.map((contact) => (
          <div key={contact.id} className="contact-card">
            <div className="contact-category">{contact.category}</div>
            <div className="contact-info">
              <div className="contact-description">{contact.name}</div>
              {contact.description && (
                <div className="contact-address">{contact.description}</div>
              )}
              <div className="contact-address">
                <strong>Адрес:</strong> {contact.address}
              </div>
              <div className="contact-hours">
                <strong>Часы работы:</strong> {contact.hours}
              </div>
              <div
                className="contact-phone"
                onClick={() => handlePhoneClick(contact.phone)}
              >
                <img src="/svg/tel.svg" alt="Phone" className="phone-icon" />
                {contact.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default Contacts;
