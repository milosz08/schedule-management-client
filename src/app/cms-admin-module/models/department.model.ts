export type DepartmentData = {
  id: number;
  isRemovable: boolean;
  name: string;
  alias: string;
};

export type DepartmentDetailsData = {
  name: string;
  alias: string;
};

export type AddUpdateDepartment = {
  name: string;
  alias: string;
};
