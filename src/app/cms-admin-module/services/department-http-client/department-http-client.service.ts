/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { DepartmentData } from '~/cms-admin-module/models/department.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class DepartmentHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getDepartments$(params: Params): Observable<Pagination<DepartmentData>> {
    return this._httpClient.get<Pagination<DepartmentData>>(
      `${this._apiUrl}/api/v1/department/all/pageable`,
      { params }
    );
  }
}
