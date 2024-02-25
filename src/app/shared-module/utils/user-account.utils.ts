/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserIdentityType } from '../types/user-identity.type';
import { UserRoleSingleLetterType } from '../types/user-role-single-letter.type';

export const createUserRoleSingleLetter = (
  role: UserIdentityType
): UserRoleSingleLetterType => {
  switch (role) {
    case UserIdentityType.ADMINISTRATOR:
      return { letter: 'a', class: 'role-dot--administrator' };
    case UserIdentityType.EDITOR:
      return { letter: 'e', class: 'role-dot--editor' };
    case UserIdentityType.TEACHER:
      return { letter: 'n', class: 'role-dot--teacher' };
    default:
      return { letter: 's', class: 'role-dot--student' };
  }
};
