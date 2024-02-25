/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { SafeUrl } from '@angular/platform-browser';
import { UserIdentityType } from '../types/user-identity.type';

export type LoginRes = {
  id: number;
  role: UserIdentityType;
  bearerToken: string;
  refreshBearerToken: string;
  nameWithSurname: string;
  login: string;
  email: string;
  firstAccess: boolean;
  profileImageUrl: string | null;
  connectedWithDepartment: string;
};

export type CurrentLoggedUser = {
  id: number;
  role: UserIdentityType;
  bearerToken: string;
  refreshBearerToken: string;
  nameWithSurname: string;
  initials: string;
  login: string;
  email: string;
  firstAccess: boolean;
  profileImageUrl: SafeUrl | null;
  connectedWithDepartment: string;
};
