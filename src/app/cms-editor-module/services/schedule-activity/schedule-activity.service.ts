/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  ScheduleActivity,
  ScheduleActivityForm,
} from '~/cms-editor-module/models/schedule-activity.model';
import {
  ConvertFromNamesToTupleRequest,
  ConvertToTupleResponse,
  ScheduleAccData,
} from '~/cms-editor-module/models/schedule-convert.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractModalProvider } from '~/shared-module/service/abstract-modal-provider';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';
import { ScheduleActivityHttpClientService } from '../schedule-activity-http-client/schedule-activity-http-client.service';

@Injectable()
export class ScheduleActivityService extends AbstractModalProvider {
  private _isSelecting$ = new BehaviorSubject<boolean>(false);
  private _selectedSchedule$ = new BehaviorSubject<
    ConvertToTupleResponse | undefined
  >(undefined);
  private _selectedDay$ = new BehaviorSubject<NameWithId | undefined>(
    undefined
  );

  constructor(
    private readonly _scheduleActivityHttpClientService: ScheduleActivityHttpClientService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    super();
  }

  publishScheduleActivity$(
    formData: ScheduleActivityForm
  ): Observable<BaseMessage> {
    return of(null).pipe(
      map(() => this._selectedSchedule$.value),
      filter(
        selectedSchedule => !!selectedSchedule && !!this._selectedDay$.value?.id
      ),
      tap(() => this.setLoading(true)),
      switchMap(selectedSchedule =>
        this._scheduleActivityHttpClientService.publishScheduleActivity$(
          this.mapToRequestDto(formData, selectedSchedule!)
        )
      ),
      tap(({ message }) => {
        this._snackbarService.addSnackbar({ message, severity: 'info' });
        this.setIsOpen(false);
        this.setLoading(false);
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }

  listenRouteParameters$(): Observable<null> {
    return this._activatedRoute.queryParamMap.pipe(
      map(paramMap => ({
        deptId: paramMap.get('deptId'),
        specId: paramMap.get('specId'),
        groupId: paramMap.get('groupId'),
      })),
      filter(
        params =>
          Object.values(params).every(param => !!param) &&
          !this._selectedSchedule$.value
      ),
      map(({ deptId, specId, groupId }) => {
        this._selectedSchedule$.next({
          deptData: { id: deptId!, name: deptId! },
          studySpecData: { id: specId!, name: specId! },
          studyGroupData: { id: groupId!, name: groupId! },
        });
        return null;
      })
    );
  }

  setSelectedSchedule$(
    req: ConvertFromNamesToTupleRequest
  ): Observable<ConvertToTupleResponse> {
    this._isSelecting$.next(true);
    return this._scheduleActivityHttpClientService
      .convertFromNamesToTuple$(req)
      .pipe(
        tap(result => {
          this._selectedSchedule$.next(result);
          this._isSelecting$.next(false);
        })
      );
  }

  navigateToScheduleActivity() {
    return {
      next: async ({
        deptData,
        studyGroupData,
        studySpecData,
      }: ConvertToTupleResponse) =>
        this._router.navigate(['/secure/editor/schedule-select/editor'], {
          queryParams: {
            deptId: deptData.id,
            specId: studySpecData.id,
            groupId: studyGroupData.id,
          },
        }),
    };
  }

  private mapToRequestDto(
    formData: ScheduleActivityForm,
    scheduleData: ConvertToTupleResponse
  ): ScheduleActivity {
    return {
      ...formData,
      deptId: scheduleData.deptData.id as number,
      studySpecId: scheduleData.studySpecData.id as number,
      studyGroupId: scheduleData.studyGroupData.id as number,
      weekDayId: this._selectedDay$.value!.id as number,
    };
  }

  override setIsOpen(isOpen: boolean, selectedDay?: NameWithId): void {
    super.setIsOpen(isOpen);
    this._selectedDay$.next(selectedDay);
  }

  get isSelecting$(): Observable<boolean> {
    return this._isSelecting$.asObservable();
  }
  get selectedDay$(): Observable<string> {
    return this._selectedDay$.pipe(map(nameWithId => nameWithId?.name || ''));
  }
  get selectedSchedule$(): Observable<ScheduleAccData> {
    return this._selectedSchedule$.pipe(
      map(schedule => ({
        deptId: schedule?.deptData.id as number,
        specId: schedule?.studySpecData.id as number,
      }))
    );
  }
}
