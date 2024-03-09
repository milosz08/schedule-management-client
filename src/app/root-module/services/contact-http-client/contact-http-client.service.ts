/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedContactFormReq } from '~/root-module/models/contact-form.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractHttpClientProvider } from '~/shared-module/service/abstract-http-client-provider';
import {
  AvailableDataModel,
  NameWithId,
} from '~/shared-module/types/drop-lists-data.type';

@Injectable()
export class ContactHttpClientService extends AbstractHttpClientProvider {
  constructor(private readonly _httpClient: HttpClient) {
    super();
  }

  getAllQueryDepartments$(
    name: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/api/v1/department/all`,
      { params: { name } }
    );
  }

  getAllQueryGroupsBaseDept$(dept: string): Observable<NameWithId[]> {
    return this._httpClient.get<NameWithId[]>(
      `${this._apiUrl}/api/v1/studygroup/dept`,
      { params: { dept } }
    );
  }

  getAllQueryContactMessagIssueTypes$(
    issueTypeName: string
  ): Observable<AvailableDataModel<string>> {
    return this._httpClient.get<AvailableDataModel<string>>(
      `${this._apiUrl}/api/v1/contactmessage/issue/type/all`,
      { params: { issueTypeName } }
    );
  }

  sendContactFormData$(req: ExtendedContactFormReq): Observable<BaseMessage> {
    return this._httpClient.post<BaseMessage>(
      `${this._apiUrl}/api/v1/contactmessage/new`,
      req
    );
  }
}
