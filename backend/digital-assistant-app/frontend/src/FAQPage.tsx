import React from 'react';

export default function FAQPage() {
  const [faq, setFaq] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // Пример статических вопросов из FAQ.txt
    setFaq([
      {
        question: 'Где посмотреть расписание занятий?',
        answer: 'Расписание доступно в системе Modeus — используйте свою учетную запись УрФУ.'
      },
      {
        question: 'Как войти в систему Modeus?',
        answer: 'Перейдите на сайт Modeus и войдите с логином и паролем от корпоративной почты УрФУ.'
      },
      {
        question: 'Как проходит заселение в общежитие для студентов УрФУ?',
        answer: 'Заселение проходит по графикам и спискам, подготовленным жилищными комиссиями институтов. Студент должен пройти медосмотр, получить ордер, заключить договор найма, оплатить проживание и предоставить документы в течение 7 рабочих дней.'
      },
      {
        question: 'Как записаться на курсы английского?',
        answer: 'Информация размещена в специализированной группе — ссылка предоставляется учебной частью.'
      }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>FAQ</h2>
      <ul>
        {faq.map((item: any, i: number) => (
          <li key={i} style={{marginBottom:10}}>
            <b>{item.question}</b>
            <div>{item.answer}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
