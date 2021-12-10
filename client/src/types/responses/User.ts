import UserPermissions from './UserPermissions';

export default interface User {
  createdAt: string;
  name: string;
  updatedAt: string;
  username: string;
  permissions: UserPermissions;
}
