/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserMessageData } from '~/cms-editor-module/models/user-message.model';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { PaginationService } from '~/cms-module/services/pagination/pagination.service';
import { UserMessageHttpClientService } from '~/cms-module/services/user-message-http-client/user-message-http-client.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-user-messages-page',
  templateUrl: './user-messages-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [PaginationService, DeleteContentService],
})
export class UserMessagesPageComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  userMessages: UserMessageData[] = [];

  constructor(
    private readonly _paginationService: PaginationService,
    private readonly _deleteContentService: DeleteContentService,
    private readonly _userMessageHttpClientService: UserMessageHttpClientService
  ) {
    super();
    this._deleteContentService.setDeleteEndpoint('contactmessage');
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._paginationService.withListenPaginatorValues$(
        this._userMessageHttpClientService.getUserMessagesBaseRole$.bind(
          this._userMessageHttpClientService
        )
      )
    ).subscribe(userMessages => (this.userMessages = userMessages));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
