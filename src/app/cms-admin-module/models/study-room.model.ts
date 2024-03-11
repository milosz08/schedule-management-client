/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

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

export type AddUpdateStudyRoomRequest = {
  name: string;
  description: string;
  departmentName: string;
  cathedralName: string;
  capacity: number;
  roomTypeName: string;
};

export type AddUpdateStudyRoomResponse = {
  name: string;
  description: string;
  capacity: number;
  departmentFullName: string;
  cathedralFullName: string;
  roomTypeFullName: string;
};
