import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

// В памяти для примера
const users: { username: string; passwordHash: string; isAdmin: boolean }[] = [
  { username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), isAdmin: true },
];

export class AuthController {
  static register(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Заполните все поля' });
    if (users.find(u => u.username === username)) return res.status(400).json({ error: 'Пользователь уже существует' });
    const passwordHash = bcrypt.hashSync(password, 8);
    users.push({ username, passwordHash, isAdmin: false });
    res.json({ success: true });
  }

  static login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Неверный логин или пароль' });
    }
    const token = jwt.sign({ username, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, isAdmin: user.isAdmin });
  }

  static me(req: Request, res: Response) {
    const user = (req as any).user;
    res.json({ username: user.username, isAdmin: user.isAdmin });
  }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Нет токена' });
  try {
    const payload = jwt.verify(auth.replace('Bearer ', ''), JWT_SECRET) as any;
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Неверный токен' });
  }
}

export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!(req as any).user?.isAdmin) return res.status(403).json({ error: 'Нет прав администратора' });
  next();
}

export function getAllUsers(req: Request, res: Response) {
  res.json({ users: users.map(u => ({ username: u.username, isAdmin: u.isAdmin })) });
}
