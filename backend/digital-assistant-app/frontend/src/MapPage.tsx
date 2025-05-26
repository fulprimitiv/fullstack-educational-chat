import React from 'react';

export default function MapPage() {
  const [map, setMap] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setMap({
      mapUrl: 'https://how-to-navigate.ru/',
      locations: [
        { name: 'Главная карта кампуса УрФУ', coordinates: { lat: 56.8389, lng: 60.6057 } }
      ]
    });
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{color:'red'}}>{error}</div>;

  return (
    <div>
      <h2>Интерактивная карта корпуса</h2>
      {map && (
        <>
          <div>
            <a href={map.mapUrl} target="_blank" rel="noopener noreferrer">Открыть карту кампуса УрФУ</a>
          </div>
          <ul>
            {map.locations && map.locations.map((loc: any, i: number) => (
              <li key={i}>
                <b>{loc.name}</b> — {loc.coordinates.lat}, {loc.coordinates.lng}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
