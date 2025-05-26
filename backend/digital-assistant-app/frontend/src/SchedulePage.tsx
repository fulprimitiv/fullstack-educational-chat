import React from 'react';

export default function SchedulePage() {
  const [schedule, setSchedule] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    fetch('/api/schedule')
      .then(res => res.json())
      .then(data => {
        setSchedule(data.schedule || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки расписания');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Персональное расписание</h2>
      {schedule.length === 0 && <p>Расписание не найдено</p>}
      <ul>
        {schedule.map((item: any, i: number) => (
          <li key={i} style={{marginBottom:10}}>
            <b>{item.course}</b> — {item.day}, {item.time} <span style={{color:'#888'}}>{item.location}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
