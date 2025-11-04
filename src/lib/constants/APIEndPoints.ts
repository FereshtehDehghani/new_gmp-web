 export default {
  // **  Login EndPoints** //
  getAuthOptionsEndpoint: "/Auth/Options",
  getAuthSettingsEndpoint: "/Auth/Settings",
  postAuthVerifyEndpoint: "/Auth/Verify",
  postRefreshTokenEndpoint: "/Profile/Refresh",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "refreshToken",
  // **  Profile EndPoints** //
  getProfileStatsURL: "/Profile/Stats",
  profileRequestChangePasswordURL: "/Profile/RequestChangePassword",
  profileChangePasswordURL: "/Profile/ChangePassword",
  getProfileLoginHistoryURL: "/Profile/LoginHistory",
  profileLoginHistoryBlockURL: "/Profile/LoginHistory/Block",
  profileLoginHistoryBlockAllURL: "/Profile/LoginHistory/BlockAll",
  profileClientEditURL: "/Profile/Client/Edit",
  getProfileClientURL : "/Profile/Client"
};


