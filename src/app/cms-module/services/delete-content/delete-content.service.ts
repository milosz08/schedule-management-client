import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractModalProvider } from '~/shared-module/service/abstract-modal-provider';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { SuspenseLoaderService } from '~/shared-module/service/suspense-loader/suspense-loader.service';
import { DeleteContentHttpClientService } from '../delete-content-http-client/delete-content-http-client.service';

@Injectable()
export class DeleteContentService extends AbstractModalProvider {
  private _deleteContentApiPath$ = new BehaviorSubject<string>('');
  private _deleteContentIds$ = new BehaviorSubject<number[]>([]);

  constructor(
    private readonly _deleteContentHttpClientService: DeleteContentHttpClientService,
    private readonly _snackbarService: SnackbarService,
    private readonly _identityService: IdentityService,
    private readonly _suspenseLoaderService: SuspenseLoaderService
  ) {
    super();
  }

  setDeleteEndpoint(endpoint: string): void {
    this._deleteContentApiPath$.next(endpoint);
  }

  openDeleteContentModal(deleteContentId: number | undefined): void {
    if (deleteContentId) {
      this.openDeleteContentModalForMultipleValues([deleteContentId]);
    }
  }

  openDeleteContentModalForMultipleValues(deleteContentIds: number[]): void {
    if (deleteContentIds.length > 0) {
      this._deleteContentIds$.next(deleteContentIds);
      this.setIsOpen(true);
    }
  }

  override setIsOpen(isOpen: boolean): void {
    super.setIsOpen(isOpen);
    if (!isOpen) {
      this._deleteContentIds$.next([]);
    }
  }

  setDeleteContentIds(id: number | undefined, insertMode: boolean): void {
    if (id) {
      const currentDeleteContent = this._deleteContentIds$.value;
      let updatedIds = [];
      if (insertMode) {
        updatedIds = [...currentDeleteContent, id];
      } else {
        updatedIds = currentDeleteContent.filter(dId => dId !== id);
      }
      this._deleteContentIds$.next(updatedIds);
    }
  }

  deleteSelectedContent$(password: string): Observable<BaseMessage> {
    return of(null).pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        combineLatest([
          this._deleteContentApiPath$,
          this._deleteContentIds$,
          this._identityService.currentLoggedUser$,
        ])
      ),
      map(([path, ids, user]) => ({
        path,
        ids,
        credentials: {
          username: user?.login || '',
          password,
        },
      })),
      switchMap(({ path, ids, credentials }) => {
        if (ids.length === 0) {
          return this._deleteContentHttpClientService.deleteAll$(
            path,
            credentials
          );
        }
        return this._deleteContentHttpClientService.deleteSelected$(
          ids,
          path,
          credentials
        );
      }),
      tap(({ message }) => {
        this._snackbarService.addSnackbar({ message, severity: 'info' });
        this.setIsOpen(false);
        this.setLoading(false);
        this._suspenseLoaderService.reloadAngularPageWithRouter();
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  get deleteContentIds$(): Observable<number[]> {
    return this._deleteContentIds$.asObservable();
  }
  get isDeleteContentEmpty$(): Observable<boolean> {
    return this._deleteContentIds$.pipe(map(ids => ids.length === 0));
  }
  get deleteContentLength$(): Observable<number> {
    return this._deleteContentIds$.pipe(map(ids => ids.length));
  }
}
