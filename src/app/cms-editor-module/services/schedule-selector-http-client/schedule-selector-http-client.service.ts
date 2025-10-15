import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import { AvailableDataModel } from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class ScheduleSelectorHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getGroupsBaseDeptAndSpec$(
    groupName: string,
    deptName: string,
    studySpecName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/studygroup/spec`,
      { params: { groupName, deptName, studySpecName } }
    );
  }

  getSpecializationsBaseDeptAndSpec$(
    specName: string,
    deptName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/studyspec/dept/all`,
      { params: { specName, deptName } }
    );
  }

  getDepartmentsByName$(name: string): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/department/all`,
      { params: { name } }
    );
  }

  getStudySpecializationsBaseDepartment$(
    specName: string,
    deptName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/studyspec/dept/all`,
      { params: { specName, deptName } }
    );
  }
}
