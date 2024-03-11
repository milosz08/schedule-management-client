/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type CathedralData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
  departmentName: string;
  departmentAlias: string;
};

export type AddUpdateCathedralRequest = {
  name: string;
  alias: string;
  departmentName: number;
};

export type AddUpdateCathedralResponse = {
  name: string;
  alias: string;
  departmentFullName: string;
};
