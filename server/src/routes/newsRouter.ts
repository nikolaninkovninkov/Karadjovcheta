import { Router } from 'express';
import { createNewsArticle, getNews } from '../controllers/newsControllers';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();
router.get('/', getNews);
router.use(authMiddleware);
router.post('/', createNewsArticle);

export default router;
