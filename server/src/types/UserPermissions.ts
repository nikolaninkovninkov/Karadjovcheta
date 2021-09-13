export default interface UserPermissions {
  news: {
    canPost: boolean;
  };
  dashboard: {
    canAccessStudentDashboard: boolean;
    canAccessModeratorDashboard: boolean;
    canAccessAdminDashboard: boolean;
  };
  vote: {
    canAddVoteItem: boolean;
    canVote: boolean;
  };
}
