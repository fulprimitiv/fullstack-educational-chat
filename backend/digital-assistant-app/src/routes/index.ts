import express, { Application } from 'express';
import { Router, Request, Response } from 'express';
import ChatbotController from '../chatbot/chatbotController';
import { MapController } from '../campus-map/mapController';
import { ContactsController } from '../contacts/contactsController';
import { NewsController } from '../news/newsController';
import { FaqController } from '../faq/faqController';
import { ScheduleController } from '../schedule/scheduleController';
import { CommunitiesController } from '../communities/communitiesController';
import { AuthController, authMiddleware, adminMiddleware, getAllUsers } from './authController';

const router = Router();

const chatbotController = new ChatbotController();
const mapController = new MapController();
const contactsController = new ContactsController();
const newsController = new NewsController();
const faqController = new FaqController();
const scheduleController = new ScheduleController();
const communitiesController = new CommunitiesController();

// Чат-бот
router.post('/chatbot', (req: Request, res: Response) => {
    let message = '';
    if (req.body && typeof req.body.message === 'string') {
        message = req.body.message;
    } else if (typeof req.body === 'string') {
        // Попытка распарсить строку (на случай неправильного Content-Type)
        try {
            const parsed = JSON.parse(req.body);
            if (parsed && typeof parsed.message === 'string') {
                message = parsed.message;
            }
        } catch {}
    }
    if (!message) {
        return res.status(400).json({ response: 'Пустой или некорректный запрос. Введите вопрос.' });
    }
    try {
        const response = chatbotController.getResponse(message);
        res.json({ response });
    } catch (e) {
        res.status(500).json({ response: 'Ошибка обработки запроса.' });
    }
});

// Карта
router.get('/map', (req: Request, res: Response) => {
    res.json(mapController.getMap());
});

// Контакты
router.get('/contacts', (req: Request, res: Response) => {
    res.json({ contacts: contactsController.getContacts() });
});

// Новости
router.get('/news', (req: Request, res: Response) => {
    res.json({ news: newsController.getNews() });
});

// FAQ
router.get('/faq', (req: Request, res: Response) => {
    res.json({ faq: faqController.getFAQs() });
});

// Расписание
router.get('/schedule', (req: Request, res: Response) => {
    res.json({ schedule: scheduleController.getSchedule() });
});

// Сообщества
router.get('/communities', (req: Request, res: Response) => {
    res.json({ communities: communitiesController.getCommunities() });
});

// Аутентификация
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);
router.get('/auth/me', authMiddleware, AuthController.me);
router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);

export default router;

export function setRoutes(app: Application) {
    app.use('/api', router);
}