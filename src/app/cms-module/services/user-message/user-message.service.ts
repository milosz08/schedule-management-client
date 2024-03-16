/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Observable,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { UserMessageDetailsData } from '~/cms-module/models/user-message.model';
import { AbstractLoadingProvider } from '~/shared-module/service/abstract-loading-provider';
import { UserMessageHttpClientService } from '../user-message-http-client/user-message-http-client.service';

@Injectable()
export class UserMessageService extends AbstractLoadingProvider {
  constructor(
    private readonly _userMessageHttpClientService: UserMessageHttpClientService,
    private readonly _route: ActivatedRoute
  ) {
    super();
  }

  fetchMessageDetails$(): Observable<UserMessageDetailsData> {
    return this._route.paramMap.pipe(
      map(param => param.get('id')),
      filter(id => !!id),
      tap(() => this.setLoading(true)),
      switchMap(id =>
        this._userMessageHttpClientService.getUserMessageDetails$(Number(id))
      ),
      tap(() => this.setLoading(false)),
      catchError(err => {
        this.setLoading(false);
        return throwError(() => err);
      })
    );
  }
}
