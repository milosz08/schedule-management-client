/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Observer,
  catchError,
  delay,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ContentMode } from '~/cms-admin-module/types/content-mode.type';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';

@Injectable()
export class AddEditContentService extends AbstractLoadingProvider {
  private _loadingEditableContent$ = new BehaviorSubject<boolean>(false);
  private _editElementId$ = new BehaviorSubject<number | undefined>(undefined);

  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) {
    super();
  }

  getCurrentMode(): ContentMode {
    return this._activatedRoute.snapshot.data['mode'] as ContentMode;
  }

  setEditElementFormContent$<T>(
    formGroup: FormGroup,
    mode: ContentMode,
    httpClientCallback: (id: number) => Observable<T>,
    disabledControlIds?: string[]
  ): Observable<T> {
    return this._activatedRoute.paramMap.pipe(
      filter(() => mode === 'edit'),
      map(param => param.get('id')),
      filter(id => !!id),
      tap(id => {
        this._loadingEditableContent$.next(true);
        this._editElementId$.next(Number(id));
      }),
      delay(500),
      switchMap(id => httpClientCallback(Number(id))),
      tap(data => {
        for (const key of Object.keys(data as object)) {
          formGroup.get(key)?.patchValue(data[key as keyof T]);
        }
        if (disabledControlIds) {
          for (const controlId of disabledControlIds) {
            formGroup.get(controlId)?.disable();
          }
        }
        this._loadingEditableContent$.next(false);
      }),
      catchError(err => {
        this._loadingEditableContent$.next(false);
        return throwError(() => err);
      })
    );
  }

  addUpdateContent$<RQ, RS>(
    mode: ContentMode,
    req: RQ,
    httpClient: AbstractHttpClientProvider,
    addCallback: (req: RQ) => Observable<RS>,
    editCallback?: (id: number, req: RQ) => Observable<RS>
  ): Observable<RS> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      delay(500),
      switchMap(() => this._editElementId$),
      switchMap(id =>
        mode === 'edit' && id && editCallback
          ? editCallback.bind(httpClient)(id, req)
          : addCallback.bind(httpClient)(req)
      ),
      tap(() => this.setLoading(false)),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  setLoadingEditableContent(isLoading: boolean): void {
    this._loadingEditableContent$.next(isLoading);
  }

  navigateOnErrorCallback<T>(redirectTo: string): Partial<Observer<T>> {
    return {
      error: async () =>
        await this._router.navigateByUrl(`/secure/admin/${redirectTo}`),
    };
  }

  get loadingEditableContent$(): Observable<boolean> {
    return this._loadingEditableContent$.asObservable();
  }
}
