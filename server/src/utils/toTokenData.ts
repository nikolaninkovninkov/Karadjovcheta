import DatabaseUser from '../types/database/DatabaseUser';
import { Document } from 'mongoose';
import TokenData from '../types/client/TokenData';
function toTokenData(user: DatabaseUser & Document<any, any, DatabaseUser>) {
  const { username } = user.toObject();
  return { username } as TokenData;
}
export default toTokenData;
