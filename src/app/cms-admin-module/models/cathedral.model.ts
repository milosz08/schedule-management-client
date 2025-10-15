export type CathedralData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
  departmentName: string;
  departmentAlias: string;
};

export type CathedralDetailsData = {
  name: string;
  alias: string;
  departmentName: string;
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
