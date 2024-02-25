/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type FirstChangePasswordReq = {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmed: string;
};
