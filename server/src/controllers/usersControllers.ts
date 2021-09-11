import express from 'express';
import UserModel from '../models/UserModel';
import RegisterData from '../types/RegisterData';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import LoginData from '../types/LoginData';
import toTokenData from '../utils/toTokenData';
import { validationResult } from 'express-validator';
import DatabaseUser from '../types/database/DatabaseUser';
import toClientUser from '../utils/toClientUser';
import timeout from '../utils/timeout';
async function registerController(req: express.Request, res: express.Response) {
  const registerData = req.body as RegisterData;
  const user = new UserModel(registerData);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const foundUsersEmail = await UserModel.find({
    email: registerData.email,
  });
  const foundUsersUsername = await UserModel.find({
    username: registerData.username,
  });
  if (foundUsersEmail.length > 0) {
    return res
      .status(400)
      .json({ message: 'User already registered with that email' });
  }
  if (foundUsersUsername.length > 0) {
    return res
      .status(400)
      .json({ message: 'User already registered with that username' });
  }
  if (!process.env.JWT_SECRET) {
    res.json({ message: 'Server error' });
    throw new Error('JWT Secret not available');
  }
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  const savedUser = await user.save();
  jwt.sign(
    toTokenData(savedUser),
    process.env.JWT_SECRET,
    { expiresIn: '1 hour' },
    (err, token) => {
      if (err) throw err;

      res.json(token);
    },
  );
}
async function loginController(req: express.Request, res: express.Response) {
  const loginData = req.body as LoginData;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const isEmail = loginData.username.includes('@');
  const foundUser = await UserModel.findOne(
    isEmail ? { email: loginData.username } : { username: loginData.username },
  );
  if (!foundUser) {
    return res.status(400).json({
      message: `no-account-${isEmail ? 'email' : 'username'}`,
    });
  }
  const isPasswordMatch = await bcrypt.compare(
    loginData.password,
    foundUser.password,
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: 'wrong-password' });
  }
  if (!process.env.JWT_SECRET) {
    res.json({ message: 'Server error' });
    throw new Error('JWT Secret not available');
  }
  jwt.sign(
    toTokenData(foundUser),
    process.env.JWT_SECRET,
    { expiresIn: '1 hour' },
    (error, token) => {
      if (error) throw error;
      res.json(token);
    },
  );
}
function getUserController(req: express.Request, res: express.Response) {
  const user = req.user as DatabaseUser;
  if (!user) return res.json(user);
  const clientUser = toClientUser(user, false);
  res.json(clientUser);
}
export { registerController, loginController, getUserController };
