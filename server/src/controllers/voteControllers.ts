import express from 'express';
import { validationResult } from 'express-validator';
import VoteItemModel from '../models/VoteItemModel';
import VoteItemData from '../types/VoteItemData';
import VotePairResult from '../types/VotePairResult';
import elo from '../utils/elo';
import roleToPermissions from '../utils/roleToPermissions';
import toClientVoteItem from '../utils/toClientVoteItem';
const getPair = async () => {
  const count = await VoteItemModel.countDocuments();
  if (count == 0) return {};
  const randomFirst = Math.floor(Math.random() * count);
  const randomSecond = Math.floor(Math.random() * (count - 1));
  const first = await VoteItemModel.findOne().skip(randomFirst);
  const second = await VoteItemModel.findOne({ id: { $ne: first?.id } }).skip(
    randomSecond,
  );
  if (!first || !second) return {};
  return { first: toClientVoteItem(first), second: toClientVoteItem(second) };
};
export async function getVoteItemPair(
  req: express.Request,
  res: express.Response,
) {
  const user = req.user;
  if (!user) return;
  const permissions = roleToPermissions(user.role);
  if (!permissions.vote.canVote) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  const pair = await getPair();
  res.json(pair);
}
export async function addVoteItem(req: express.Request, res: express.Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);
  const voteItemData = req.body as VoteItemData;
  const user = req.user;
  if (!user) return;
  const permissions = roleToPermissions(user.role);
  if (!permissions.vote.canAddVoteItem) {
    return res.status(403).json({ message: 'Insufficient permissions' });
  }
  const voteItem = new VoteItemModel(voteItemData);
  const saved = await voteItem.save();
  res.json(saved);
}
export async function resolveMatch(
  req: express.Request,
  res: express.Response,
) {
  const {
    first: firstId,
    second: secondId,
    result,
  } = req.body as VotePairResult;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.json(errors);
  const user = req.user;
  if (!user) return;
  const permissions = roleToPermissions(user.role);
  if (!permissions.vote.canVote) {
    return res.json({ message: 'Insufficient permissions' });
  }
  const first = await VoteItemModel.findOne({ id: firstId });
  const second = await VoteItemModel.findOne({ id: secondId });
  if (!first || !second)
    return res.status(400).json({ message: 'Vote items not found' });
  const newRatings = elo.score(first.rating, second.rating, result, 20);
  await VoteItemModel.findOneAndUpdate(
    {
      id: first.id,
    },
    { rating: newRatings.ratingA },
  );

  await VoteItemModel.findOneAndUpdate(
    {
      id: second.id,
    },
    { rating: newRatings.ratingB },
  );
  const pair = await getPair();
  res.json(pair);
}
