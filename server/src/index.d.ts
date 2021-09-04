import * as express from 'express';
import DatabaseUser from './types/database/DatabaseUser';
declare global {
  namespace Express {
    interface Request {
      user: DatabaseUser | undefined;
      toClient: any;
    }
  }
}
