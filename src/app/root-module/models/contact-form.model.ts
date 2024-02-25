/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type ContactFormReq = {
  issueType: string;
  departmentName: string;
  isAnonymous: boolean;
  groups: number[];
  description: string;
};

export type ExtendedContactFormReq = ContactFormReq & {
  name: string | null;
  surname: string | null;
  email: string | null;
};
