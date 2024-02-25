/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */

export type SnackbarSeverity = 'info' | 'error';

export type SnackbarData = {
  message: string;
  severity: SnackbarSeverity;
};

export type SnackbarPersistorData = SnackbarData & {
  id: string;
};
