import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RememberScheduleBar } from '~/root-module/models/remember-schedule-bar.model';
import { ScheduleDataRes } from '~/shared-module/models/schedule-data.model';
import { LocalStorageService } from '~/shared-module/service/local-storage/local-storage.service';

@Injectable()
export class RememberScheduleBarService {
  private _loadedData$ = new BehaviorSubject<RememberScheduleBar[]>([]);

  private readonly MAX_PERSISTED_ROUTES_COUNT = 5;

  constructor(
    private readonly _localStorageService: LocalStorageService,
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {}

  loadRememberScheduleData(): void {
    this._loadedData$.next(
      this._localStorageService.get<RememberScheduleBar[]>(
        'remember_schedule_bar'
      ) ?? []
    );
  }

  addRememberContent(scheduleData: ScheduleDataRes): void {
    const headerData = scheduleData.scheduleHeaderData;
    const hasComma = headerData.indexOf(',') !== -1;
    const headerFormat = scheduleData.scheduleHeaderData.substring(
      headerData.indexOf('-') + 2,
      hasComma ? headerData.indexOf(',') : headerData.length
    );
    const queryParamMap = this._route.snapshot.queryParamMap;
    const scheduleSavingData: RememberScheduleBar = {
      scheduleName: headerFormat,
      params: queryParamMap.keys.reduce(
        (acc, key) => ({ ...acc, [key]: queryParamMap.get(key) }),
        {}
      ) as ParamMap,
    };
    let persistedData = this._loadedData$.value;
    const findDuplicates = persistedData.find(
      ({ scheduleName }) => scheduleName === headerFormat
    );
    if (!findDuplicates) {
      if (persistedData.length < this.MAX_PERSISTED_ROUTES_COUNT) {
        persistedData = [...persistedData, scheduleSavingData];
      } else {
        const removeLastElement = persistedData.filter((_, idx) => idx !== 4);
        persistedData = [...removeLastElement, scheduleSavingData];
      }
    }
    this._loadedData$.next(persistedData);
    this._localStorageService.save('remember_schedule_bar', persistedData);
  }

  async removeSelectedSchedule(name: string): Promise<void> {
    const scheduleData = this._loadedData$.value;
    const updatedData = scheduleData.filter(
      ({ scheduleName }) => scheduleName !== name
    );
    this._loadedData$.next(updatedData);
    this._localStorageService.save('remember_schedule_bar', updatedData);
    await this._router.navigateByUrl('/schedule');
  }

  get loadedData$(): Observable<RememberScheduleBar[]> {
    return this._loadedData$.asObservable();
  }
}
