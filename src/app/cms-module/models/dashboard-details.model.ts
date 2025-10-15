export type DashboardDetailsData = {
  email: string;
  shortcut: string;
  city: string;
  nationality: string;
  departmentFullName: string;
  cathedralFullName: string;
  studySpecializations: string[];
  studySubjects: string[];
  dashboardElementsCount: {
    allElements: number;
    departmentsCount: number;
    cathedralsCount: number;
    studyRoomsCount: number;
    studySpecializationsCount: number;
    studySubjectsCount: number;
    studyGroupsCount: number;
  } | null;
  dashboardUserTypesCount: {
    allElements: number;
    studentsCount: number;
    teachersCount: number;
    editorsCount: number;
    administratorsCount: number;
  } | null;
};

export type DashboardWithPlotData = {
  data: DashboardDetailsData;
  elementsPlot: number[];
  rolesPlot: number[];
};

export type UpdateUserImageResponse = {
  message: string;
  resourceUrl: string;
};
