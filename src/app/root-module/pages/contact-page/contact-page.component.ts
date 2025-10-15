import { Component } from '@angular/core';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { IdentityService } from '~/shared-module/service/identity/identity.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  providers: [ContactService],
})
export class ContactPageComponent {
  loggedUser$ = this._identityService.currentLoggedUser$;

  constructor(private readonly _identityService: IdentityService) {}
}
