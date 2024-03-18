/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

export type ConvertFromNamesToTupleRequest = {
  departmentName: string;
  studySpecName: string;
  studyGroupName: string;
};

export type ConvertFromIdsToTupleRequest = {
  departmentId: number;
  studySpecId: number;
  studyGroupId: number;
};

export interface ConvertToTupleResponse {
  deptData: NameWithId;
  studySpecData: NameWithId;
  studyGroupData: NameWithId;
}
