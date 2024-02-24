/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type SearchQueryReq = {
  searchQuery: string;
  isGroupsActive: boolean;
  isTeachersActive: boolean;
  isRoomsActive: boolean;
};

export type SearchQueryRes = {
  pathQueryParams: {
    [key: string]: number;
  };
  departmentName: string;
  pathParam: string;
  typeName: string;
  fullName: string;
};
