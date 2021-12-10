import { Document } from 'mongoose';
export default interface DatabaseUser {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  uid: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  role: UserRole;
}
