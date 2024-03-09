/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { UserIdentityType } from '~/shared-module/types/user-identity.type';

export type CathedralData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
  departmentName: string;
  departmentAlias: string;
};

export type DepartmentData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
};

export type StudyGroupData = {
  id: number;
  name: string;
  departmentName: string;
  departmentAlias: string;
  studySpecName: string;
  studySpecAlias: string;
};

export type StudyRoomData = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  departmentName: string;
  departmentAlias: string;
  cathedralName: string;
  cathedralAlias: string;
  roomTypeName: string;
  roomTypeAlias: string;
  deptWithCathAlias: string;
};

export type StudySpecializationData = {
  id: number;
  name: string;
  specTypeName: string;
  specTypeAlias: string;
  departmentName: string;
  departmentAlias: string;
  studyDegree: string;
  studyDegreeAlias: string;
};

export type StudySubjectData = {
  id: number;
  name: string;
  specName: string;
  specAlias: string;
  departmentName: string;
  departmentAlias: string;
};

export type UserData = {
  id: number;
  isRemovable: boolean;
  nameWithSurname: string;
  login: string;
  role: UserIdentityType;
};
