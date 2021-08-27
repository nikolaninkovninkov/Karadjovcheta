import * as express from 'express';
import * as viberbot from 'viber-bot';
import DatabaseUser from './types/database/DatabaseUser';
declare global {
  namespace Express {
    interface Request {
      user: DatabaseUser | undefined;
    }
  }
}
