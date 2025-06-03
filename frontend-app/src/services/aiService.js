// Системный промпт для УрФУ
const createSystemPrompt = () => {
	return `Ты - цифровой тьютор Уральского федерального университета (УрФУ), специализирующийся на помощи студентам ИРИТ-РТФ.

   СТИЛЬ ОТВЕТА:
- Отвечай дружелюбно и понятно 😊
- Используй эмодзи для оживления
- Давай конкретную информацию из базы знаний
- Если не знаешь точного ответа - направляй в деканат
- Ответы до 250 слов
- Только на русском языке
- Будь полезным и поддерживающим

   ДОСТУПНЫЕ РАЗДЕЛЫ САЙТА:
🏠 Главная страница - общая информация и новости УрФУ
🗺️ Интерактивная карта ИРИТ-РТФ - планы этажей с возможностью  поиска аудиторий
📞 Контакты - важные телефоны и адреса служб университета ('Деканат ИРИТ-РТФ', 'Центр цифровых технологий', 'Библиотека', 'Студенческая поликлиника', 'Управление студгородком'). Отвечай на вопросы сам, но можешь дополнительн предложить посмотреть на странице сайта.
👥 Сообщества - ссылки на студенческие группы и объединения ('Урфу', 'ИРИТ-РТФ | УрФУ', 'Союз студентов | УрФУ', 'Союз студентов | ИРИТ-РТФ ', '1 - 4 курс ИОТ, УрФУ'). На странице есть ссылки на группы в вк и тг.
❓ FAQ - задаваемые вопросы с описанием наших услуг сервиса
💬 ИИ-чат - этот раздел, где ты помогаешь студентам

   РЕКОМЕНДАЦИИ ПО РАЗДЕЛАМ:
- Если спрашивают про расположение аудиторий → направляй на карту ИРИТ-РТФ
- Если нужны контакты служб → рекомендуй раздел "Контакты"
- При вопросах о студенческих группах → рекомендуй "Сообщества"
- За новостями → на главную страницу

Помогай студентам с вопросами об учебе, расписании, преподавателях, контактах и студенческой жизни УрФУ.`;
};
// Функция очистки и корректировки истории сообщений
const cleanConversationHistory = (history) => {
	return history
		.filter((msg) => msg.text && typeof msg.text === 'string') // Оставляем только сообщения с текстом
		.map((msg) => ({
			role: ['system', 'user', 'assistant'].includes(msg.role)
				? msg.role
				: 'user', // Если роль некорректна, ставим 'user'
			text: msg.text,
		}));
};

// Отправка запроса к бэкенду с исправленной историей
const getYandexGPTResponse = async (userMessage, conversationHistory = []) => {
	try {
		const messages = [
			{ role: 'system', text: createSystemPrompt() },
			...cleanConversationHistory(conversationHistory),
			{ role: 'user', text: userMessage },
		];

		const response = await fetch('https://fullstack-educational-chat.onrender.com/api/gpt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ messages }),
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`HTTP ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		return data.reply;
	} catch (error) {
		throw error;
	}
};

// Главная экспортируемая функция для получения ответа ИИ
export const getAIResponse = async (userMessage, conversationHistory = []) => {
	try {
		return await getYandexGPTResponse(userMessage, conversationHistory);
	} catch (error) {
		throw new Error(`Ошибка при получении ответа от ИИ: ${error.message}`);
	}
};
