import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  delay,
  of,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { LastOpenedSchedule } from '~/cms-editor-module/models/last-opened-schedule.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { FetchingState } from '~/shared-module/types/fetching-state.type';
import { LastOpenedSchedulesHttpClientService } from '../last-opened-schedules-http-client/last-opened-schedules-http-client.service';

@Injectable()
export class LastOpenedSchedulesService {
  private _fetchingState$ = new BehaviorSubject<FetchingState>('fetching');
  private _isRemovingSelected$ = new BehaviorSubject<boolean>(false);
  private _isRemovingAll$ = new BehaviorSubject<boolean>(false);

  private _updateObservable$ = new Subject();

  constructor(
    private readonly _lastOpenedSchedulesServiceHttpClient: LastOpenedSchedulesHttpClientService,
    private readonly _snackbarService: SnackbarService
  ) {}

  fetchLastOpenedSchedules$(): Observable<LastOpenedSchedule[]> {
    return this._updateObservable$.pipe(
      startWith(null),
      tap(() => this._fetchingState$.next('fetching')),
      delay(500),
      switchMap(() =>
        this._lastOpenedSchedulesServiceHttpClient
          .getAllLastOpenedSchedules$()
          .pipe(
            tap(() => this._fetchingState$.next('success')),
            catchError(() => {
              this._fetchingState$.next('failure');
              return of();
            })
          )
      )
    );
  }

  triggeredLoadAgain(): void {
    this._updateObservable$.next(null);
  }

  removeSelected$(selectedIds: number[]): Observable<BaseMessage> {
    return this.removeContent$(
      this._lastOpenedSchedulesServiceHttpClient.deleteSelectedLastOpenedSchedules$(
        selectedIds
      ),
      this._isRemovingSelected$
    );
  }

  removeAll$(): Observable<BaseMessage> {
    return this.removeContent$(
      this._lastOpenedSchedulesServiceHttpClient.deleteAllLastOpenedSchedules$(),
      this._isRemovingAll$
    );
  }

  private removeContent$(
    deleteHttpCallback$: Observable<BaseMessage>,
    loadingTrigger: BehaviorSubject<boolean>
  ): Observable<BaseMessage> {
    loadingTrigger.next(true);
    return deleteHttpCallback$.pipe(
      tap(({ message }) => {
        loadingTrigger.next(false);
        this._updateObservable$.next(null);
        this._snackbarService.addSnackbar({ message, severity: 'info' });
      }),
      catchError(err => {
        loadingTrigger.next(false);
        return throwError(() => err);
      })
    );
  }

  get isRemovingSelected$(): Observable<boolean> {
    return this._isRemovingSelected$.asObservable();
  }
  get isRemovingAll$(): Observable<boolean> {
    return this._isRemovingAll$.asObservable();
  }
  get fetchingState$(): Observable<FetchingState> {
    return this._fetchingState$.asObservable();
  }
}
