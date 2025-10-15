import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

export type ConvertFromNamesToTupleRequest = {
  departmentName: string;
  studySpecName: string;
  studyGroupName: string;
};

export type ConvertToTupleResponse = {
  deptData: NameWithId;
  studySpecData: NameWithId;
  studyGroupData: NameWithId;
};

export type ScheduleAccData = {
  deptId: number;
  specId: number;
};
