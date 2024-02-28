/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ScheduleNavList,
  ScheduleNavParams,
} from '~/root-module/models/schedule-nav-list.model';
import { ScheduleNavigationHttpClientService } from '~/root-module/services/schedule-navigation-http-client/schedule-navigation-http-client.service';
import { ScheduleNavigationService } from '~/root-module/services/schedule-navigation/schedule-navigation.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrl: './schedule-page.component.scss',
  providers: [ScheduleNavigationService],
})
export class SchedulePageComponent {
  activeNav = 'grupy';

  readonly buttons = ['sale', 'pracownicy', 'grupy'];

  constructor(
    private readonly _scheduleNavigationHttpClientService: ScheduleNavigationHttpClientService
  ) {}

  handleToggleActiveSection(section: string): void {
    this.activeNav = section;
  }

  handleFetchCathedrals$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getCathedralsFromDepartment$(
      params['deptId']
    );
  }

  handleFetchStudyRooms$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getStudyRoomsFromCathedral$(
      params['deptId'],
      params['cathId']
    );
  }

  handleFetchEmployers$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getEmployersFromCathedral$(
      params['deptId'],
      params['cathId']
    );
  }

  handleFetchStudyDegrees$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getDegreesBaseDepartment$(
      params['deptId']
    );
  }

  handleFetchStudySpecs$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getStudySpecsBaseDegree$(
      params['deptId'],
      params['degreeId']
    );
  }

  handleFetchStudySemesters$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getSemestersBaseStudyGroup$(
      params['deptId'],
      params['specId']
    );
  }

  handleFetchStudyGroups$(
    params: ScheduleNavParams
  ): Observable<ScheduleNavList[]> {
    return this._scheduleNavigationHttpClientService.getGroupsBaseStudySpecAndSem$(
      params['specId'],
      params['semId']
    );
  }
}
