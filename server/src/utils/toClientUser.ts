import DatabaseUser from '../types/database/DatabaseUser';
import { Document } from 'mongoose';
import roleToPermissions from './roleToPermissions';
export default function (
  user: (Document<any, any, DatabaseUser> & DatabaseUser) | DatabaseUser,
  privateUse: boolean,
) {
  if (privateUse) {
    const { password, _id, __v, ...rest } = (user as any)._doc ?? user;
    return { permissions: roleToPermissions(user.role), ...rest };
  } else {
    const { password, _id, __v, role, email, ...rest } =
      (user as any)._doc ?? user;
    return rest;
  }
}
