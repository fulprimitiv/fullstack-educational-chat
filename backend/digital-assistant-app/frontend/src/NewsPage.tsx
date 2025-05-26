import React from 'react';

export default function NewsPage() {
  const [news, setNews] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // Добавлены новости с сайта urfu.ru
    setNews([
      {
        id: 1,
        title: 'Всем дипломы! Выпускной УрФУ 28 июня',
        date: '2025-06-28',
        content: 'Встречаемся 28 июня на площади перед Главным учебным корпусом. Подробнее: https://diplom.urfu.ru/'
      },
      {
        id: 2,
        title: 'Приемная кампания 2025',
        date: '2025-05-26',
        content: 'Вся информация о поступлении, правилах приема, стоимости обучения и вступительных испытаниях: https://urfu.ru/priemurfu'
      },
      {
        id: 3,
        title: 'Поддержка талантливой молодежи',
        date: '2025-05-20',
        content: 'Все о государственных именных стипендиях: https://urfu.ru/ru/students/study/scholarships/imennye-stipendii/'
      },
      {
        id: 4,
        title: 'Комплексная безопасность',
        date: '2025-05-15',
        content: 'О мерах по обеспечению безопасности: https://urfu.ru/fileadmin/user_upload/common_files/employee/docs/2024/O_merakh_po_obespecheniju_bezopasnosti_v_UrFU_0001.pdf'
      },
      {
        id: 5,
        title: 'Анкетирование студентов УрФУ',
        date: '2025-05-10',
        content: 'Расскажите, что можно улучшить: https://quest.my1.urfu.ru/questionary/b99fabe7-2fe9-11f0-949a-07db711dc578/form'
      },
      {
        id: 6,
        title: 'Студенты смогут принять участие в предпринимательских тренингах',
        date: '2025-05-20',
        content: 'Подробнее: https://oblgazeta.ru/industry-and-economy/enterprise/2025/05/98521/'
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Новости</h2>
      {news.length === 0 && <p>Нет новостей</p>}
      <ul>
        {news.map((n: any) => (
          <li key={n.id} style={{marginBottom:10}}>
            <b>{n.title}</b> <span style={{color:'#888'}}>{n.date}</span>
            <div>{n.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
