import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AddUpdateCathedralRequest,
  AddUpdateCathedralResponse,
  CathedralData,
  CathedralDetailsData,
} from '~/cms-admin-module/models/cathedral.model';
import { Pagination } from '~/cms-module/models/pagination.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import { AvailableDataModel } from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class CathedralHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getCathedrals$(params: Params): Observable<Pagination<CathedralData>> {
    return this._httpClient.get<Pagination<CathedralData>>(
      `${this._apiUrl}/v1/cathedral/all/pageable`,
      { params }
    );
  }

  getCathedralsBaseDepartment$(
    cathName: string,
    deptName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/v1/cathedral/dept/all`,
      { params: { cathName, deptName } }
    );
  }

  getCathedralDetails$(id: number): Observable<CathedralDetailsData> {
    return this._httpClient.get<CathedralDetailsData>(
      `${this._apiUrl}/v1/cathedral/${id}/details`
    );
  }

  createNewCathedral$(
    req: AddUpdateCathedralRequest
  ): Observable<AddUpdateCathedralResponse> {
    return this._httpClient.post<AddUpdateCathedralResponse>(
      `${this._apiUrl}/v1/cathedral`,
      req
    );
  }

  updateCathedral$(
    id: number,
    req: AddUpdateCathedralRequest
  ): Observable<AddUpdateCathedralResponse> {
    return this._httpClient.put<AddUpdateCathedralResponse>(
      `${this._apiUrl}/v1/cathedral/${id}`,
      req
    );
  }
}
