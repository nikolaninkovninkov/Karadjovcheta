import UserPermissions from '../types/UserPermissions';

const permissions: Record<UserRole, UserPermissions> = {
  user: {
    news: {
      canPost: false,
    },
    dashboard: {
      canAccessStudentDashboard: false,
      canAccessStudentModeratorDashboard: false,
      canAccessAdminDashboard: false,
    },
  },
  student: {
    news: {
      canPost: true,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessStudentModeratorDashboard: false,
      canAccessAdminDashboard: false,
    },
  },
  'moderator-student': {
    news: {
      canPost: true,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessStudentModeratorDashboard: true,
      canAccessAdminDashboard: false,
    },
  },
  admin: {
    news: {
      canPost: true,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessStudentModeratorDashboard: true,
      canAccessAdminDashboard: true,
    },
  },
};
function roleToPermissions(role: UserRole): UserPermissions {
  return permissions[role];
}
export default roleToPermissions;
