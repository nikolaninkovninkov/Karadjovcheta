import * as express from 'express';
import * as viberbot from 'viber-bot';
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
