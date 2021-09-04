import { Router } from 'express';
import { createNewsArticle, getNews } from '../controllers/newsControllers';
import authMiddleware from '../middleware/authMiddleware';
import { body } from 'express-validator';
const titleCheck = body(
  'title',
  'Title must be between 10 and 100 characters long',
).isLength({ min: 10, max: 100 });
const contentCheck = body('content', 'Content must be defined').notEmpty();
const createChecks = [titleCheck, contentCheck];
const router = Router();
router.get('/', getNews);
router.use(authMiddleware);
router.post('/', [...createChecks, createNewsArticle]);

export default router;
