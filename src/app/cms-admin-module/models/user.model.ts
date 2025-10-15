import { UserIdentityType } from '~/shared-module/types/user-identity.type';

export type UserData = {
  id: number;
  isRemovable: boolean;
  nameWithSurname: string;
  login: string;
  role: UserIdentityType;
};

export type UserDetailsData = {
  name: string;
  surname: string;
  city: string;
  nationality: string;
  role: string;
  departmentName: string;
  cathedralName: string;
  studySpecsOrSubjects: number[];
};

export type AddUpdateUserRequest = {
  name: string;
  surname: string;
  nationality: string;
  city: string;
  role: string;
  departmentName: string;
  cathedralName: string;
  studySpecsOrSubjects: string;
};

export type AddUpdateUserResponse = {
  name: string;
  surname: string;
  nationality: string;
  city: string;
  role: UserIdentityType;
  email: string;
  emailPassword: string;
  departmentData: string;
  cathedralData: string;
};
