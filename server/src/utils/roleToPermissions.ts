import UserPermissions from '../types/UserPermissions';

const permissions: Record<UserRole, UserPermissions> = {
  user: {
    news: {
      canPost: false,
    },
  },
  moderator: {
    news: {
      canPost: true,
    },
  },
  admin: {
    news: {
      canPost: true,
    },
  },
};
function roleToPermissions(role: UserRole): UserPermissions {
  return permissions[role];
}
export default roleToPermissions;
