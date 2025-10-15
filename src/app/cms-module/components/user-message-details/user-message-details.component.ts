import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMessageDetailsData } from '~/cms-module/models/user-message.model';
import { UserMessageService } from '~/cms-module/services/user-message/user-message.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-user-message-details',
  templateUrl: './user-message-details.component.html',
})
export class UserMessageDetailsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() returnUrl = '/';

  isLoading$ = this._userMessageService.isLoading$;

  messageData?: UserMessageDetailsData;

  constructor(
    private readonly _userMessageService: UserMessageService,
    private readonly _router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._userMessageService.fetchMessageDetails$()
    ).subscribe({
      next: messageData => (this.messageData = messageData),
      error: async () => await this._router.navigateByUrl(this.returnUrl),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
