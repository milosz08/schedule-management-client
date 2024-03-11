/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

export type UserData = {
  id: number;
  isRemovable: boolean;
  nameWithSurname: string;
  login: string;
  role: UserIdentityType;
};
