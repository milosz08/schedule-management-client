import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ScheduleSubjectDetails } from '~/shared-module/models/schedule-subject-details.model';
import { FetchingState } from '~/shared-module/types/fetching-state.type';
import { UserIdentityType } from '~/shared-module/types/user-identity.type';
import { AbstractModalProvider } from '../abstract-modal-provider';
import { IdentityService } from '../identity/identity.service';
import { ScheduleHttpClientService } from '../schedule-http-client/schedule-http-client.service';

@Injectable()
export class ScheduleSubjectModalService
  extends AbstractModalProvider
  implements OnDestroy
{
  private _selectedSubjectId$ = new BehaviorSubject<number | null>(null);
  private _loadingState$ = new BehaviorSubject<FetchingState>('fetching');

  constructor(
    private readonly _scheduleHttpClientService: ScheduleHttpClientService,
    private readonly _router: Router,
    private readonly _identityService: IdentityService
  ) {
    super();
    this.wrapAsObservable$(this._router.events).subscribe(() =>
      this.setIsOpen(false)
    );
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  fetchSubjectDetails$(): Observable<ScheduleSubjectDetails> {
    return this._selectedSubjectId$.pipe(
      filter(subjectId => !!subjectId),
      tap(() => this._loadingState$.next('fetching')),
      switchMap(subjectId =>
        this._scheduleHttpClientService.getScheduleSubjectDetails$(subjectId!)
      ),
      tap(() => {
        this._loadingState$.next('success');
      }),
      catchError(() => {
        this._loadingState$.next('failure');
        return throwError(() => null);
      })
    );
  }

  openAndFetchScheduleSubjectData(subjectId: number): void {
    this.setIsOpen(true);
    this._selectedSubjectId$.next(subjectId);
  }

  get isEditableSectionVisible$(): Observable<boolean> {
    return this._identityService.currentLoggedUser$.pipe(
      map(
        user =>
          (user?.role === UserIdentityType.EDITOR ||
            user?.role === UserIdentityType.ADMINISTRATOR) &&
          this._router.url.includes('secure')
      )
    );
  }
}
