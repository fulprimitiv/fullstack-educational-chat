import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router, { setRoutes } from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Для отладки: логируем тело запроса и заголовки
app.use((req, res, next) => {
    console.log('HEADERS:', req.headers);
    console.log('BODY:', req.body);
    next();
});

// Database connection (MongoDB, можно заменить на другую БД при необходимости)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/digital-assistant', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as any)
.then(() => {
    console.log('Connected to the database');
})
.catch((err: any) => {
    console.error('Database connection error:', err);
});

// Set up routes
setRoutes(app);

// Добавим простой роут для корня, чтобы не было ошибки Cannot GET /
app.get('/', (req, res) => {
    res.send('Digital Assistant backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});