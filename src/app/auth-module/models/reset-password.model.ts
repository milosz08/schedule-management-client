import { UserIdentityType } from '~/shared-module/types/user-identity.type';

export type CheckResetPasswordRes = {
  token: string;
  nameWithSurname: string;
  role: UserIdentityType;
  profileImageUrl: string | null;
};

export type ResetPasswordReq = {
  newPassword: string;
  newPasswordConfirmed: string;
};
