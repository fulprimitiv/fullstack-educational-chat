// Яндекс GPT конфигурация
const YANDEX_API_KEY = process.env.REACT_APP_YANDEX_API_KEY;
const YANDEX_FOLDER_ID = process.env.REACT_APP_YANDEX_FOLDER_ID;
const YANDEX_API_URL = 'https://llm.api.cloud.yandex.net/foundationModels/v1/completion';

console.log('🔑 API Key:', YANDEX_API_KEY ? 'ЕСТЬ' : 'НЕТ');
console.log('📁 Folder ID:', YANDEX_FOLDER_ID ? 'ЕСТЬ' : 'НЕТ');

// Проверка доступности Яндекс GPT
const isYandexGPTAvailable = () => {
	const available = !!(YANDEX_API_KEY && YANDEX_FOLDER_ID);
	console.log('🔍 Яндекс GPT:', available ? 'ДОСТУПЕН' : 'НЕ НАСТРОЕН');
	console.log('🔑 API Key проверка:', YANDEX_API_KEY ? `${YANDEX_API_KEY.substring(0, 10)}...` : 'undefined');
	console.log('📁 Folder ID проверка:', YANDEX_FOLDER_ID ? `${YANDEX_FOLDER_ID.substring(0, 10)}...` : 'undefined');
	return available;
};

// Системный промпт для УрФУ
const createSystemPrompt = () => {
	return `Ты - цифровой тьютор Уральского федерального университета (УрФУ), специализирующийся на помощи студентам ИРИТ-РТФ.

БАЗА ЗНАНИЙ УрФУ:

🏛️ РУКОВОДСТВО:
• Ректор УрФУ: Виктор Анатольевич Кокшаров
• Директор ИРИТ-РТФ: Александр Сергеевич Востриков

👨‍🏫 ИЗВЕСТНЫЕ ПРЕПОДАВАТЕЛИ:
• Владимир Константинович Обабков - заведующий кафедрой АУТС, профессор, доктор технических наук. Легендарный преподаватель, известен строгими экзаменами по теории автоматического управления. Кабинет: Р-430.

🏢 КАФЕДРЫ ИРИТ-РТФ:
• АУТС - Автоматика и управление в технических системах (зав. В.К. Обабков)
• ИВТ - Информатика и вычислительная техника  
• САПР - Системы автоматизированного проектирования
• Радиотехника и связь

📚 УЧЕБНЫЙ ПРОЦЕСС:
• Расписание: личный кабинет студента (lk.urfu.ru), сайт УрФУ, мобильное приложение УрФУ
• Сессия: зимняя (январь), летняя (июнь)
• Экзамены: расписание публикуется за 2 недели до начала сессии
• Пересдачи: до 3 попыток, нужно заявление в деканат

📞 ВАЖНЫЕ КОНТАКТЫ:
• Деканат ИРИТ-РТФ: ул. Мира 19, каб. 123, +7 (343) 375-40-00
• Библиотека УрФУ: ул. Тургенева 4, Пн-Сб 9:00-21:00
• Общежития: ул. 8 Марта 62, +7 (343) 375-40-00
• Техподдержка: круглосуточно +7 (343) 375-40-00
• Студенческая поликлиника: ул. Комсомольская 59б

🎓 СТУДЕНЧЕСКАЯ ЖИЗНЬ:
• Союз студентов УрФУ: https://posurfu.ru/
• Студенческое IT-объединение ЮНИТ
• Спортивные секции и кружки
• Культурные мероприятия

СТИЛЬ ОТВЕТА:
- Отвечай дружелюбно и понятно 😊
- Используй эмодзи для оживления
- Давай конкретную информацию из базы знаний
- Если не знаешь точного ответа - направляй в деканат
- Ответы до 250 слов
- Только на русском языке
- Будь полезным и поддерживающим

Помогай студентам с вопросами об учебе, расписании, преподавателях, контактах и студенческой жизни УрФУ.`;
};

// Запрос к Яндекс GPT
const getYandexGPTResponse = async (userMessage, conversationHistory = []) => {
	try {
		console.log('🚀 Отправляем запрос к Яндекс GPT...');
		console.log('🔗 URL:', YANDEX_API_URL);

		// Формируем сообщения
		const messages = [
			{
				role: 'system',
				text: createSystemPrompt()
			}
		];

		// Добавляем историю (последние 6 сообщений)
		if (conversationHistory.length > 0) {
			conversationHistory.slice(-6).forEach(msg => {
				messages.push({
					role: msg.role === 'user' ? 'user' : 'assistant',
					text: msg.content
				});
			});
		}

		// Добавляем текущее сообщение
		messages.push({
			role: 'user',
			text: userMessage
		});

		const requestBody = {
			modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt-lite`,
			completionOptions: {
				stream: false,
				temperature: 0.7,
				maxTokens: 800
			},
			messages: messages
		};

		console.log('📦 Request body:', JSON.stringify(requestBody, null, 2));

		const response = await fetch(YANDEX_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Api-Key ${YANDEX_API_KEY}`,
				'x-folder-id': YANDEX_FOLDER_ID
			},
			body: JSON.stringify(requestBody)
		});

		console.log('📡 Response status:', response.status);
		console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

		if (!response.ok) {
			const errorText = await response.text();
			console.error('❌ Ошибка Яндекс GPT:', response.status, errorText);
			throw new Error(`HTTP ${response.status}: ${errorText}`);
		}

		const data = await response.json();
		console.log('📥 Response data:', data);

		const aiResponse = data.result.alternatives[0].message.text;

		console.log('✅ Получен ответ от Яндекс GPT');
		return aiResponse;

	} catch (error) {
		console.error('❌ Ошибка при запросе к Яндекс GPT:', error);
		throw error;
	}
};

// Главная функция получения ответа
export const getAIResponse = async (userMessage, conversationHistory = []) => {
	console.log('📤 Обрабатываем сообщение:', userMessage);

	if (isYandexGPTAvailable()) {
		try {
			const response = await getYandexGPTResponse(userMessage, conversationHistory);
			return response;
		} catch (error) {
			console.error('❌ Ошибка Яндекс GPT:', error.message);
			throw new Error(`Яндекс GPT недоступен: ${error.message}`);
		}
	} else {
		throw new Error('Яндекс GPT не настроен. Проверьте переменные окружения.');
	}
};

