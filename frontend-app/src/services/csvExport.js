// Функция для экспорта данных в CSV
export const exportTableToCsv = (data, filename) => {
  // Заголовки CSV
  const headers = [
    'Название',
    'Производительность',
    'Энергопотребление',
    'Температура',
    'Цена',
    'Надежность',
    'Доля рынка',
    'Рейтинг',
  ];

  // Преобразуем данные в строки CSV
  const csvRows = [
    headers.join(','),
    ...data.map((row) =>
      [
        `"${row.name}"`,
        row.performance,
        row.powerConsumption,
        row.temperature,
        row.price,
        row.reliability,
        row.marketShare,
        row.customerRating,
      ].join(',')
    ), // Данные
  ];

  const csvString = csvRows.join('\n');

  // Создаем Blob с данными CSV
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Создаем ссылку для скачивания
  const link = document.createElement('a');

  // Поддержка для разных браузеров
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
