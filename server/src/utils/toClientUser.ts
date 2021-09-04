import DatabaseUser from '../types/database/DatabaseUser';
import { Document } from 'mongoose';
import roleToPermissions from './roleToPermissions';
import isUserDocument from './isUserDocument';
export default function (
  userParam: (Document<any, any, DatabaseUser> & DatabaseUser) | DatabaseUser,
  privateUse: boolean,
) {
  if (!userParam) return;
  const user = isUserDocument(userParam) ? userParam.toObject() : userParam;
  if (privateUse) {
    const { password, _id, __v, ...rest } = user;
    return { permissions: roleToPermissions(user.role), ...rest };
  } else {
    const { password, _id, __v, email, ...rest } = user;
    return { permissions: roleToPermissions(user.role), ...rest };
  }
}
