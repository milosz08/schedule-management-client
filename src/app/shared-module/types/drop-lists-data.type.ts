/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type AvailableDataModel<T> = {
  dataElements: T[];
};

export type NameWithId = {
  id: number | string;
  name: string;
};
