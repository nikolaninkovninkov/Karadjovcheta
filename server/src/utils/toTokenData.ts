import DatabaseUser from '../types/database/DatabaseUser';
import { Document } from 'mongoose';
import TokenData from '../types/client/TokenData';
export default (user: DatabaseUser & Document<any, any, DatabaseUser>) => {
  const { name, email, username } = user.toObject();
  const tokenData = { name, email, username };
  return tokenData as TokenData;
};
