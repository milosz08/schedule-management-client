export type StudySubjectData = {
  id: number;
  name: string;
  specName: string;
  specAlias: string;
  departmentName: string;
  departmentAlias: string;
};

export type StudySubjectDetailsData = {
  name: string;
  departmentName: string;
  studySpecName: string;
};

export type AddUpdateStudySubjectRequest = {
  name: string;
  departmentName: string;
  studySpecName: string;
};

export type AddUpdateStudySubjectResponse = {
  name: string;
  alias: string;
  departmentFullName: string;
  studySpecFullName: string;
};
