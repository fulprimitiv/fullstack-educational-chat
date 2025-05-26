import React from 'react';

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setContacts([
      {
        name: 'Деканат ИРИТ-РТФ (Тюстина Анна Андреевна)',
        position: 'Деканат',
        email: 'dekanat@irit-rtf.urfu.ru',
        phone: '+7 (343) 375-44-80',
        address: '620002, Екатеринбург, ул. Мира, 32, каб. Р-219'
      },
      {
        name: 'Приемная комиссия ИРИТ-РТФ',
        position: 'Приемная комиссия',
        email: 'pk@irit-rtf.urfu.ru',
        phone: '+7 (343) 375-44-92',
        address: 'ул. Мира, 32, каб. Р-217'
      },
      {
        name: 'Куратор по учебной работе (Тюстина Анна Андреевна)',
        position: 'Учебная часть',
        email: 'uch@irit-rtf.urfu.ru',
        phone: '+7 (343) 375-44-80',
        address: 'ул. Мира, 32, каб. Р-219'
      },
      {
        name: 'Куратор по воспитательной работе',
        position: 'Воспитательная работа',
        email: 'vosp@irit-rtf.urfu.ru',
        phone: '+7 (343) 375-44-80',
        address: 'ул. Мира, 32, каб. Р-219'
      },
      {
        name: 'Профком студентов (ФИО не указано)',
        position: 'Профком',
        email: 'profkom@irit-rtf.urfu.ru',
        phone: '+7 (343) 375-45-18',
        address: 'ул. Мира, 19, ауд. ГУК-309'
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Контакты</h2>
      <ul>
        {contacts.map((c: any, i: number) => (
          <li key={i} style={{marginBottom:10}}>
            <b>{c.name}</b> <span style={{color:'#888'}}>{c.position}</span><br/>
            <span>Тел.: {c.phone}</span><br/>
            <span>Email: <a href={`mailto:${c.email}`}>{c.email}</a></span><br/>
            <span>Адрес: {c.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
