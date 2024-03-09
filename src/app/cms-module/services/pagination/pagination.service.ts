/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable, OnDestroy } from '@angular/core';
import { Params } from '@angular/router';
import _ from 'lodash';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  delay,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  CurrentActivePages,
  Pagination,
  PaginationData,
  PaginationWithRefetch,
} from '~/cms-module/models/pagination.model';
import { SortingBy } from '~/cms-module/types/sorting-by.type';
import { SortingDir } from '~/cms-module/types/sorting-dir.type';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { FetchingState } from '~/shared-module/types/fetching-state.type';
import { PaginationHttpClientService } from '../pagination-http-client/pagination-http-client.service';

@Injectable()
export class PaginationService
  extends AbstractReactiveProvider
  implements OnDestroy
{
  private _sortDir$ = new BehaviorSubject<SortingDir>('ASC');
  private _sortBy$ = new BehaviorSubject<SortingBy>('Id');

  private _searchPhrase$ = new BehaviorSubject<string>('');
  private _totalPages$ = new BehaviorSubject<number>(0);
  private _paginationData$ = new BehaviorSubject<PaginationData | undefined>(
    undefined
  );
  private _activePages$ = new BehaviorSubject<CurrentActivePages | undefined>(
    undefined
  );

  private _currentPage$ = new BehaviorSubject<number>(1);
  private _currentSize$ = new BehaviorSubject<number>(5);
  private _allPageSizes$ = new BehaviorSubject<number[]>([]);

  private _fetchingStatus$ = new BehaviorSubject<FetchingState>('fetching');
  private _refetchDataObserver$ = new BehaviorSubject<string>(uuidv4());

  constructor(
    private readonly _paginationHttpClientService: PaginationHttpClientService
  ) {
    super();
    this.wrapAsObservable$(
      this._paginationHttpClientService.getPaginationSizes$()
    ).subscribe(pageSizes => this._allPageSizes$.next(pageSizes));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  withListenPaginatorValues$<T>(
    dataCallback: (params: Params) => Observable<Pagination<T>>
  ): Observable<T[]> {
    return combineLatest([
      this._refetchDataObserver$,
      this._searchPhrase$,
      this._currentPage$,
      this._currentSize$,
      this._sortBy$,
      this._sortDir$,
    ]).pipe(
      map(
        ([
          refetchId,
          searchPhrase,
          pageNumber,
          pageSize,
          sortBy,
          sortDirection,
        ]): PaginationWithRefetch => ({
          refetchId,
          pagination: {
            searchPhrase,
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
          },
        })
      ),
      distinctUntilChanged(
        (prev: PaginationWithRefetch, curr: PaginationWithRefetch) =>
          _.isEqual(prev.pagination, curr.pagination) &&
          prev.refetchId === curr.refetchId
      ),
      tap(() => this._fetchingStatus$.next('fetching')),
      delay(500),
      switchMap(({ pagination }) =>
        dataCallback(pagination).pipe(
          map(({ elements, pagination, currentActivePages }) => {
            this._paginationData$.next(pagination);
            this._activePages$.next(currentActivePages);
            this._totalPages$.next(pagination.totalPagesCount);
            this._fetchingStatus$.next('success');
            return elements;
          }),
          catchError(() => {
            this._fetchingStatus$.next('failure');
            return of();
          })
        )
      )
    );
  }

  toggleSortDir(sortBy: SortingBy): void {
    const currentSortDir = this._sortDir$.value;
    let updatedSortDir: SortingDir = 'ASC';
    if (currentSortDir == 'ASC') {
      updatedSortDir = 'DES';
    }
    this._sortBy$.next(sortBy);
    this._sortDir$.next(updatedSortDir);
  }

  updatePageSize(size: number): void {
    this._currentSize$.next(size);
  }

  invokeRefetchData(): void {
    this._refetchDataObserver$.next(uuidv4());
  }

  setPrevPage(): void {
    let currentPage = this._currentPage$.value;
    if (currentPage - 1 > 0) {
      this.selectPage(--currentPage);
    }
  }

  selectPage(page: number): void {
    this._currentPage$.next(page);
  }

  setNextPage(): void {
    let currentPage = this._currentPage$.value;
    if (currentPage < this._totalPages$.value) {
      this.selectPage(++currentPage);
    }
  }

  setSearchPhrase(phrase: string): void {
    this._searchPhrase$.next(phrase);
  }

  get sortDir$(): Observable<SortingDir> {
    return this._sortDir$.asObservable();
  }
  get sortBy$(): Observable<SortingBy> {
    return this._sortBy$.asObservable();
  }
  get currentPage$(): Observable<number> {
    return this._currentPage$.asObservable();
  }
  get currentSize$(): Observable<number> {
    return this._currentSize$.asObservable();
  }
  get allPageSizes$(): Observable<number[]> {
    return this._allPageSizes$.asObservable();
  }
  get totalPages$(): Observable<number> {
    return this._totalPages$.asObservable();
  }
  get activePages$(): Observable<CurrentActivePages | undefined> {
    return this._activePages$.asObservable();
  }
  get paginationData$(): Observable<PaginationData | undefined> {
    return this._paginationData$.asObservable();
  }
  get fetchingStatus$(): Observable<FetchingState> {
    return this._fetchingStatus$.asObservable();
  }
}
