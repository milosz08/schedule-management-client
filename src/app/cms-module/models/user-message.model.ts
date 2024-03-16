/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type UserMessageData = {
  id: number;
  nameWithSurname: string;
  issueType: string;
  isAnonymous: string;
  createdDate: string;
};

export type UserMessageDetailsData = {
  nameWithSurname: string;
  email: string;
  messageIdentifier: string;
  issueType: string;
  departmentName: string;
  groups: string[];
  isAnonymous: string;
  createdDate: string;
  description: string;
};
