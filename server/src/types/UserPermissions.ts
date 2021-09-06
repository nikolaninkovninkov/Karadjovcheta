export default interface UserPermissions {
  news: {
    canPost: boolean;
  };
  dashboard: {
    canAccessStudentDashboard: boolean;
    canAccessStudentModeratorDashboard: boolean;
    canAccessAdminDashboard: boolean;
  };
}
