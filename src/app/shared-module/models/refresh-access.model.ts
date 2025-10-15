export type RefreshTokenReq = {
  expiredAccessToken: string;
  refreshToken: string;
};

export type RefreshTokenRes = {
  accessToken: string;
  refreshToken: string;
};
