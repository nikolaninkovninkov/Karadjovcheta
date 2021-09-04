import { Router } from 'express';
import { createNewsArticle, getNews } from '../controllers/newsControllers';
import authMiddleware from '../middleware/authMiddleware';
import { body } from 'express-validator';
const titleCheck = body(
  'title',
  'Title must be a maximum of 100 and a minimum of 10 characters long',
).isLength({ min: 10, max: 100 });
const contentCheck = body('content', "Content mustn't be empty").notEmpty();
const createChecks = [titleCheck, contentCheck];
const router = Router();
router.get('/', getNews);
router.use(authMiddleware);
router.post('/', [...createChecks, createNewsArticle]);

export default router;
