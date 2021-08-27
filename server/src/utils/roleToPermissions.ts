import UserPermissions from '../types/UserPermissions';
const userPerms = {
  news: {
    canPost: false,
  },
};
const moderatorPerms = {
  news: {
    canPost: true,
  },
};
const adminPerms = {
  news: {
    canPost: true,
  },
};
function roleToPermissions(role: UserRole): UserPermissions {
  if (role == 'user') {
    return userPerms;
  }
  if (role == 'moderator') {
    return moderatorPerms;
  }
  if (role == 'admin') {
    return adminPerms;
  }
  return userPerms;
}
export default roleToPermissions;
