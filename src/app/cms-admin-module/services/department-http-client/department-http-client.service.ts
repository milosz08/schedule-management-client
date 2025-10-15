import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateDepartment,
  DepartmentData,
  DepartmentDetailsData,
} from '~/cms-admin-module/models/department.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import { AvailableDataModel } from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class DepartmentHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getDepartments$(params: Params): Observable<Pagination<DepartmentData>> {
    return this._httpClient.get<Pagination<DepartmentData>>(
      `${this._apiUrl}/v1/department/all/pageable`,
      { params }
    );
  }

  getDepartmentsByName$(name: string): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/department/all`,
      { params: { name } }
    );
  }

  getDepartmentDetails$(id: number): Observable<DepartmentDetailsData> {
    return this._httpClient.get<DepartmentDetailsData>(
      `${this._apiUrl}/v1/department/${id}/details`
    );
  }

  createNewDepartment$(
    req: AddUpdateDepartment
  ): Observable<AddUpdateDepartment> {
    return this._httpClient.post<AddUpdateDepartment>(
      `${this._apiUrl}/v1/department`,
      req
    );
  }

  updateDepartment$(
    id: number,
    req: AddUpdateDepartment
  ): Observable<AddUpdateDepartment> {
    return this._httpClient.put<AddUpdateDepartment>(
      `${this._apiUrl}/v1/department/${id}`,
      req
    );
  }
}
