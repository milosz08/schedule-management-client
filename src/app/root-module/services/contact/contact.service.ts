/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import {
  ContactFormReq,
  ExtendedContactFormReq,
} from '~/root-module/models/contact-form.model';
import { BaseMessage } from '~/shared-module/models/base-mesage.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';
import { ContactHttpClientService } from '../contact-http-client/contact-http-client.service';

@Injectable()
export class ContactService extends AbstractLoadingProvider {
  private _typeQuery$ = new BehaviorSubject<string>('');
  private _departmentQuery$ = new BehaviorSubject<string>('');
  private _departmentName$ = new BehaviorSubject<string>('');

  constructor(
    private readonly _contactHttpClientService: ContactHttpClientService,
    private readonly _snackbarService: SnackbarService
  ) {
    super();
  }

  updateTypeQuery(query: string | undefined): void {
    this._typeQuery$.next(query || '');
  }

  updateDepartmentQuery(query: string | undefined): void {
    this._departmentQuery$.next(query || '');
  }

  setDepartmentName(departmentName: string): void {
    this._departmentName$.next(departmentName);
  }

  sendAnonymousContactFormMessage$(
    req: ExtendedContactFormReq
  ): Observable<BaseMessage> {
    return this.sendContactFormMessage$(req, true);
  }

  sendLoggedUserContactFormMessage$(
    req: ContactFormReq
  ): Observable<BaseMessage> {
    const extendedReq: ExtendedContactFormReq = {
      name: null,
      surname: null,
      email: null,
      ...req,
    };
    return this.sendContactFormMessage$(extendedReq, false);
  }

  fetchDepartments$(): Observable<string[]> {
    return this._departmentQuery$.pipe(
      switchMap(query =>
        this._contactHttpClientService.getAllQueryDepartments$(query)
      ),
      map(result => result.dataElements),
      catchError(() => [])
    );
  }

  fetchContactMessageIssueTypes$(): Observable<string[]> {
    return this._typeQuery$.pipe(
      switchMap(query =>
        this._contactHttpClientService.getAllQueryContactMessagIssueTypes$(
          query
        )
      ),
      map(result => result.dataElements),
      catchError(() => [])
    );
  }

  fetchGroupsBaseDepartment$(): Observable<NameWithId[]> {
    return this._departmentName$.pipe(
      filter(departmentName => !!departmentName),
      switchMap(departmentName =>
        this._contactHttpClientService.getAllQueryGroupsBaseDept$(
          departmentName
        )
      ),
      catchError(() => [])
    );
  }

  private sendContactFormMessage$(
    req: ExtendedContactFormReq,
    isAnonymous: boolean
  ): Observable<BaseMessage> {
    req.isAnonymous = isAnonymous;
    this.setLoading(true);
    return this._contactHttpClientService.sendContactFormData$(req).pipe(
      tap(({ message }) => {
        this.setLoading(false);
        this._snackbarService.addSnackbar({ message, severity: 'info' });
      }),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
