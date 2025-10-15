export type StudyGroupData = {
  id: number;
  name: string;
  departmentName: string;
  departmentAlias: string;
  studySpecName: string;
  studySpecAlias: string;
};

export type AddUpdateStudyGroupRequest = {
  departmentName: string;
  studySpecName: string;
  semesters: number[];
  countOfGroups: number;
};

export type AddUpdateStudyGroupResponse = {
  name: string;
  departmentFullName: string;
  studySpecFullName: string;
  semesterName: string;
};
