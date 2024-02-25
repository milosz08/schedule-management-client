/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type RefreshTokenReq = {
  expiredAccessToken: string;
  refreshToken: string;
};

export type RefreshTokenRes = {
  accessToken: string;
  refreshToken: string;
};
