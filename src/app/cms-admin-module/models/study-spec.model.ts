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

export type StudySpecializationDetailsData = {
  name: string;
  alias: string;
  departmentName: string;
  studyType: number[];
  studyDegree: number[];
};

export type AddUpdateStudySpecializationRequest = {
  name: string;
  alias: string;
  departmentName: string;
  studyType: number[];
  studyDegree: number[];
};

export type AddUpdateStudySpecializationResponse = {
  name: string;
  alias: string;
  departmentFullName: string;
  studyTypeFullName: string;
  studyDegreeFullName: string;
};
