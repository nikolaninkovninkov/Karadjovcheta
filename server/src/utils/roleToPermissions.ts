import UserPermissions from '../types/UserPermissions';

const permissions: Record<UserRole, UserPermissions> = {
  user: {
    news: {
      canPost: false,
    },
    dashboard: {
      canAccessStudentDashboard: false,
      canAccessModeratorDashboard: false,
      canAccessAdminDashboard: false,
    },
  },
  student: {
    news: {
      canPost: false,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessModeratorDashboard: false,
      canAccessAdminDashboard: false,
    },
  },
  moderator: {
    news: {
      canPost: false,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessModeratorDashboard: true,
      canAccessAdminDashboard: false,
    },
  },
  admin: {
    news: {
      canPost: true,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessModeratorDashboard: true,
      canAccessAdminDashboard: true,
    },
  },
};
function roleToPermissions(role: UserRole): UserPermissions {
  return permissions[role];
}
export default roleToPermissions;
