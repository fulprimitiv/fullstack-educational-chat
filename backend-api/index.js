const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/gpt', async (req, res) => {
	const messages = req.body.messages;

	if (!Array.isArray(messages)) {
		return res.status(400).json({ error: 'Неверный формат: ожидается массив messages' });
	}

	try {
		const response = await axios.post(
			'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
			{
				modelUri: "gpt://b1gf8t70epg0rhnacvsc/yandexgpt-lite",
				completionOptions: {
					stream: false,
					temperature: 0.6,
					maxTokens: 500
				},
				messages
			},
			{
				headers: {
					'Authorization': `Api-Key ${process.env.YANDEX_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		);

		res.json({ reply: response.data.result.alternatives[0].message.text });
	} catch (err) {
		console.error('Ошибка от Яндекс GPT:', err.response?.data || err.message);
		res.status(500).json({ error: 'Ошибка получения ответа от Яндекс GPT' });
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`✅ Сервер запущен на порту ${PORT}`);
});
