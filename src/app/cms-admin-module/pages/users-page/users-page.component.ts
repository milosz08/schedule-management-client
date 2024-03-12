/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '~/cms-admin-module/models/user.model';
import { UserHttpClientService } from '~/cms-admin-module/services/user-http-client/user-http-client.service';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class UsersPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  users: UserData[] = [];

  loggedUserLogin$ = this._identityService.loggedUserLogin$;

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _userHttpClientService: UserHttpClientService,
    private readonly _identityService: IdentityService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('user');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._userHttpClientService.getUsers$.bind(this._userHttpClientService)
      )
    ).subscribe(users => (this.users = users));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
