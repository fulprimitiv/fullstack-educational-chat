import React from 'react';

export default function CommunitiesPage() {
  const [communities, setCommunities] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // Добавлены ссылки на сообщества
    setCommunities([
      { name: 'VK ИРИТ-РТФ', link: 'https://vk.com/irit_rtf?from=groups' },
      { name: 'VK Project IT', link: 'https://vk.com/project__it?from=groups' },
      { name: 'VK URFU Memes', link: 'https://vk.com/urfumemes' },
      { name: 'VK УрФУ', link: 'https://vk.com/ural.federal.university' },
      { name: 'VK URFU Esports', link: 'https://vk.com/urfu_esports' },
      { name: 'VK Спорт УрФУ', link: 'https://vk.com/sporturfu' }
    ]);
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Студенческие сообщества</h2>
      <ul>
        {communities.map((c: any, i: number) => (
          <li key={i} style={{marginBottom:10}}>
            <a href={c.link} target="_blank" rel="noopener noreferrer">{c.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
