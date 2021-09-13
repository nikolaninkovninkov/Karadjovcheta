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
    vote: {
      canVote: false,
      canAddVoteItem: false,
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
    vote: {
      canVote: true,
      canAddVoteItem: false,
    },
  },
  moderator: {
    news: {
      canPost: true,
    },
    dashboard: {
      canAccessStudentDashboard: true,
      canAccessModeratorDashboard: true,
      canAccessAdminDashboard: false,
    },
    vote: {
      canVote: true,
      canAddVoteItem: false,
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
    vote: {
      canVote: true,
      canAddVoteItem: true,
    },
  },
};
function roleToPermissions(role: UserRole): UserPermissions {
  return permissions[role];
}
export default roleToPermissions;
