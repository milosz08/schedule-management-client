import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import {
  DashboardDetailsData,
  DashboardWithPlotData,
} from '~/cms-module/models/dashboard-details.model';
import { FileExtensionType } from '~/cms-module/types/file-extension.type';
import { ProfileImageLoadingFor } from '~/cms-module/types/loading-for.type';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { IdentityService } from '~/shared-module/service/identity/identity.service';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { FetchingState } from '~/shared-module/types/fetching-state.type';
import { DashboardHttpClientService } from '../dashboard-http-client/dashboard-http-client.service';

@Injectable()
export class DashboardService {
  private _fetchingState$ = new BehaviorSubject<FetchingState>('fetching');
  private _refetchObserver$ = new BehaviorSubject<string>(uuidv4());

  private _dashboardData$ = new BehaviorSubject<
    DashboardDetailsData | undefined
  >(undefined);

  private _loadingFor$ = new BehaviorSubject<ProfileImageLoadingFor>('none');

  constructor(
    private readonly _dashboardHttpClientService: DashboardHttpClientService,
    private readonly _snackbarService: SnackbarService,
    private readonly _identityService: IdentityService
  ) {}

  fetchDashboardDetails$(): Observable<DashboardWithPlotData> {
    return this._refetchObserver$.pipe(
      distinctUntilChanged(),
      tap(() => this._fetchingState$.next('fetching')),
      delay(400),
      switchMap(() =>
        this._dashboardHttpClientService.getDashboardDetails$().pipe(
          map(dashboardData => {
            this._fetchingState$.next('success');
            this._dashboardData$.next(dashboardData);
            return {
              data: dashboardData,
              elementsPlot: this.mapObjectToArray(
                dashboardData.dashboardElementsCount
              ),
              rolesPlot: this.mapObjectToArray(
                dashboardData.dashboardUserTypesCount
              ),
            };
          }),
          catchError(() => {
            this._fetchingState$.next('failure');
            return of();
          })
        )
      )
    );
  }

  refetchData(): void {
    this._refetchObserver$.next(uuidv4());
  }

  updateProfileImage$(file: File): Observable<BaseMessage> {
    return of(null).pipe(
      map(() => {
        const result = this.validateFileInput(file, ['jpeg', 'jpg', 'png'], 5);
        if (result) {
          this._snackbarService.addSnackbar({
            message: result,
            severity: 'error',
          });
        }
        return result;
      }),
      filter(result => result === ''),
      tap(() => this._loadingFor$.next('updating')),
      switchMap(() =>
        this._dashboardHttpClientService.updateProfileImage$(file)
      ),
      map(({ message, resourceUrl }) => {
        this._snackbarService.addSnackbar({ message, severity: 'info' });
        this._identityService.updateProfileImage(resourceUrl);
        this._loadingFor$.next('none');
        return { message };
      }),
      catchError(err => {
        this._loadingFor$.next('none');
        return throwError(() => err);
      })
    );
  }

  deleteProfileImage$(): Observable<BaseMessage> {
    this._loadingFor$.next('deleting');
    return this._dashboardHttpClientService.deleteProfileImage$().pipe(
      tap(({ message }) => {
        this._identityService.updateProfileImage('');
        this._snackbarService.addSnackbar({ message, severity: 'info' });
        this._loadingFor$.next('none');
      }),
      catchError(err => {
        this._loadingFor$.next('none');
        return throwError(() => err);
      })
    );
  }

  private validateFileInput(
    file: File | null,
    allowedExt: FileExtensionType[],
    maxFileSizeMb: number
  ): string {
    if (!file) {
      return 'Należy wybrać plik.';
    }
    const fileExt = file.name.slice(
      ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
    );
    if (
      allowedExt.length !== 0 &&
      !(allowedExt as string[]).includes(fileExt)
    ) {
      return `Plik musi mieć jedno z rozszerzeń: ${allowedExt.join(', ')}.`;
    }
    const maxSizeInBytes = maxFileSizeMb * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `Maksymalny rozmiar pliku to ${maxFileSizeMb}MB.`;
    }
    return '';
  }

  private mapObjectToArray(mappingObject: object | null): number[] {
    return mappingObject
      ? Object.keys(mappingObject)
          .filter(key => key !== 'allElements')
          .map(key => mappingObject[key as keyof typeof mappingObject])
      : [];
  }

  get fetchingState$(): Observable<FetchingState> {
    return this._fetchingState$.asObservable();
  }
  get dashboardData$(): Observable<DashboardDetailsData | undefined> {
    return this._dashboardData$.asObservable();
  }
  get loadingFor$(): Observable<ProfileImageLoadingFor> {
    return this._loadingFor$.asObservable();
  }
}
