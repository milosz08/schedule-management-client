/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type ScheduleActivity = {
  deptId: number;
  studyYear: string;
  studySpecId: number;
  studyGroupId: number;
  isAddForAllGroups: boolean;
  weekDayId: number;
  subjectOrActivityName: string;
  subjectTypeName: string;
  subjectRooms: number[];
  subjectTeachers: number[];
  hourStart: string;
  hourEnd: string;
  weeksData: string[];
};

export interface ScheduleActivityForm {
  studyYear: string;
  isAddForAllGroups: boolean;
  subjectOrActivityName: string;
  subjectTypeName: string;
  subjectRooms: number[];
  subjectTeachers: number[];
  hourStart: string;
  hourEnd: string;
  weeksData: string[];
}
