import express from 'express';
import { auth } from 'firebase-admin';
import jwt from 'jsonwebtoken';
import TokenData from '../types/client/TokenData';
const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'Invalid token' });
  }
  const token = authHeader.split('Bearer ')[1];
  if (!process.env.JWT_SECRET) {
    res.status(500).json({ message: 'Server error' });
    throw new Error('JWT_SECRET is not defined');
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).send({ message: 'Invalid token' });
    if (!payload) throw new Error('Payload is undefined');
    req.user = payload as TokenData;
    next();
  });
  // auth()
  //   .verifyIdToken(token)
  //   .then((payload) => {
  //     req.user = payload;
  //     next();
  //   });
};
export default authMiddleware;
