/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserIdentityType } from '../types/user-identity.type';

export type SavedAccountsReq = {
  savedAccountIds: number[];
};

export type SavedAccountRes = {
  id: number;
  login: string;
  nameWithSurname: string;
  email: string;
  role: UserIdentityType;
  profileImageUrl: string | null;
};
