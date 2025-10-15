import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  DashboardDetailsData,
  UpdateUserImageResponse,
} from '~/cms-module/models/dashboard-details.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';

@Injectable()
export class DashboardHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getDashboardDetails$(): Observable<DashboardDetailsData> {
    return this._httpClient.get<DashboardDetailsData>(
      `${this._apiUrl}/v1/user/dashboard/details`
    );
  }

  updateProfileImage$(image: File): Observable<UpdateUserImageResponse> {
    const formData = new FormData();
    formData.append('image', image);
    return this._httpClient.post<UpdateUserImageResponse>(
      `${this._apiUrl}/v1/file/profile`,
      formData
    );
  }

  deleteProfileImage$(): Observable<BaseMessage> {
    return this._httpClient.delete<BaseMessage>(
      `${this._apiUrl}/v1/file/profile`
    );
  }
}
