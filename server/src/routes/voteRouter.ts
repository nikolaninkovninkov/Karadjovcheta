import { Router } from 'express';
import {
  addVoteItem,
  getVoteItemPair,
  resolveMatch,
} from '../controllers/voteControllers';
import { body } from 'express-validator';
import authMiddleware from '../middleware/authMiddleware';
const router = Router();
const nameCheck = body(
  'name',
  'Name of vote item must not be empty',
).notEmpty();
const resultCheck = body(
  'result',
  'Result must be 1, 0.5 or 0 - win, tie or loss',
).custom((result: number) => result == 0 || result == 0.5 || result == 1);
const firstCheck = body('first', "Id of item mustn't be empty").notEmpty();
const secondCheck = body('second', "Id of item mustn't be empty'").notEmpty();
const resolvePairChecks = [firstCheck, secondCheck, resultCheck];
router.use(authMiddleware);
router
  .route('/')
  .post(nameCheck, addVoteItem)
  .get(getVoteItemPair)
  .put([...resolvePairChecks, resolveMatch]);
export default router;
