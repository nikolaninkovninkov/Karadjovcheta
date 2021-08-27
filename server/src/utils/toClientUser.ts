import DatabaseUser from '../types/database/DatabaseUser';
import { Document } from 'mongoose';
import toClientData from './toClientData';
export default function (user: DatabaseUser) {
  const { password, _id, __v, ...rest } = user;
  console.log(rest);
  return rest;
}
