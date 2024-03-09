/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduleNavList } from '~/root-module/models/schedule-nav-list.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class ScheduleNavigationHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getDepartments$(): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/department/all/schedule`
    );
  }

  getCathedralsFromDepartment$(deptId: number): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/cathedral/schedule/department/${deptId}`
    );
  }

  getStudyRoomsFromCathedral$(
    deptId: number,
    cathId: number
  ): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/studyroom/dept/${deptId}/cath:/${cathId}`
    );
  }

  getStudySpecsBaseDegree$(
    deptId: number,
    degreeId: number
  ): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/studyspec/schedule/dept/${deptId}/degree/${degreeId}/all`
    );
  }

  getEmployersFromCathedral$(
    deptId: number,
    cathId: number
  ): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/user/employeer/dept/${deptId}/cath/${cathId}/all`
    );
  }

  getSemestersBaseStudyGroup$(
    deptId: number,
    specId: number
  ): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/helper/semester/dept/${deptId}/spec/${specId}/all`
    );
  }

  getGroupsBaseStudySpecAndSem$(
    specId: number,
    semId: number
  ): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/studygroup/spec/${specId}/sem/${semId}`
    );
  }

  getDegreesBaseDepartment$(deptId: number): Observable<ScheduleNavList[]> {
    return this._httpClient.get<ScheduleNavList[]>(
      `${this._apiUrl}/api/v1/helper/degrees/dept/${deptId}/all`
    );
  }
}
