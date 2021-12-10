import { Document } from 'mongoose';
import DatabaseUser from '../types/database/DatabaseUser';
export default function (
  object: any,
): object is Document<any, any, DatabaseUser> & DatabaseUser {
  return 'toObject' in object;
}
