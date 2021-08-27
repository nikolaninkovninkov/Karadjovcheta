import { Document } from 'mongoose';

export default function <T>(object: T) {
  const { __v, _id, ...rest } = (object as any)._doc;
  return rest as Omit<T, '__v|_id'>;
}
