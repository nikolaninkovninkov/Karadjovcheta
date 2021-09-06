import express from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import TokenData from '../types/client/TokenData';
import UserModel from '../models/UserModel';
import DatabaseUser from '../types/database/DatabaseUser';
const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.split('Bearer ')[1]) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  const token = authHeader
    .split('Bearer ')[1]
    .split('')
    .map((char) => {
      if (char == '"') {
        return '';
      }
      return char;
    })
    .join('');
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Server error' });
    throw new Error('JWT_SECRET is not defined');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send({ message: 'Invalid token' });
    if (!payload) throw new Error('Payload is undefined');

    UserModel.findOne({
      username: (payload as JwtPayload & TokenData).username,
    }).then((user) => {
      if (!user) return res.status(400).json({ message: 'Invalid token' });
      req.user = user.toObject() as DatabaseUser;
      next();
    });
  });
};
export default authMiddleware;
