import { SortingBy } from '../types/sorting-by.type';
import { SortingDir } from '../types/sorting-dir.type';

export type Pagination<T> = {
  elements: T[];
  pagination: PaginationData;
  currentActivePages: CurrentActivePages;
};

export type PaginationData = {
  totalPagesCount: number;
  elementsFrom: number;
  elementsTo: number;
  totalElementsCount: number;
};

export type CurrentActivePages = {
  activePages: number[];
  minEnabled: boolean;
  maxEnabled: boolean;
};

export type PaginationSendData = {
  searchPhrase: string;
  pageNumber: number;
  pageSize: number;
  sortBy: SortingBy;
  sortDirection: SortingDir;
};

export type PaginationWithRefetch = {
  refetchId: string;
  pagination: PaginationSendData;
};
