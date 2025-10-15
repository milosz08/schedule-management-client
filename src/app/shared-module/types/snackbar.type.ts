export type SnackbarSeverity = 'info' | 'error';

export type SnackbarData = {
  message: string;
  severity: SnackbarSeverity;
};

export type SnackbarPersistorData = SnackbarData & {
  id: string;
};
