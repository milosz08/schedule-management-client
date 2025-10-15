import { Component } from '@angular/core';
import { UserMessageService } from '~/cms-module/services/user-message/user-message.service';

@Component({
  selector: 'app-user-message-page',
  templateUrl: './user-message-page.component.html',
  host: { class: 'app__main-flex-columned' },
  providers: [UserMessageService],
})
export class UserMessagePageComponent {}
