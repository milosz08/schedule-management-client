/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
} from '~/cms-editor-module/models/schedule-convert.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractModalProvider } from '~/shared-module/service/abstract-modal-provider';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { ScheduleActivityHttpClientService } from '../schedule-activity-http-client/schedule-activity-http-client.service';

@Injectable()
export class ScheduleActivityService extends AbstractModalProvider {
  private _isSelecting$ = new BehaviorSubject<boolean>(false);
  private _selectedSchedule$ = new BehaviorSubject<
    ConvertToTupleResponse | undefined
  >(undefined);

  constructor(
    private readonly _scheduleActivityHttpClientService: ScheduleActivityHttpClientService,
    private readonly _snackbarService: SnackbarService,
    private readonly _router: Router
  ) {
    super();
  }

  publishScheduleActivity$(
    formData: ScheduleActivityForm,
    weekDayId: number
  ): Observable<BaseMessage> {
    return of(null).pipe(
      map(() => this._selectedSchedule$.value),
      filter(selectedSchedule => !!selectedSchedule),
      switchMap(selectedSchedule =>
        this._scheduleActivityHttpClientService.publishScheduleActivity$(
          this.mapToRequestDto(formData, selectedSchedule!, weekDayId)
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
    scheduleData: ConvertToTupleResponse,
    weekDayId: number
  ): ScheduleActivity {
    return {
      ...formData,
      deptId: scheduleData.deptData.id as number,
      studySpecId: scheduleData.studySpecData.id as number,
      studyGroupId: scheduleData.studyGroupData.id as number,
      weekDayId,
    };
  }

  get isSelecting$(): Observable<boolean> {
    return this._isSelecting$.asObservable();
  }
}
