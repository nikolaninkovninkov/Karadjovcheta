import { Router } from 'express';
import { body } from 'express-validator';
import {
  getUserController,
  loginController,
  registerController,
} from '../controllers/usersControllers';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();
const emailCheck = body('email', 'Invalid email addess')
  .isEmail()
  .normalizeEmail();
const nameCheck = body('name', 'Name field empty').notEmpty();
const usernameRegex = /^[a-zA-Z0-9._]+$/;
const usernameCheck = body(
  'username',
  'Length of username must be from 3 to 32 characters in length and contain only latin letters, numbers, dots and underscores ',
)
  .isLength({ min: 3, max: 32 })
  .matches(usernameRegex);

const passwordCheck = body(
  'password',
  'Password needs to be a minimum of 8 and a maximum of 32 characters',
).isLength({ min: 8, max: 32 });
const usernameNotEmptyCheck = body(
  'username',
  'Username field empty',
).notEmpty();
const passwordNotEmptyCheck = body(
  'password',
  'Password field empty',
).notEmpty();
const registerChecks = [emailCheck, nameCheck, usernameCheck];
const loginChecks = [usernameNotEmptyCheck, passwordNotEmptyCheck];
router.post('/register', [...registerChecks, registerController]);
router.post('/login', [...loginChecks, loginController]);
router.use('/auth', authMiddleware);
router.get('/auth', getUserController);
export default router;
