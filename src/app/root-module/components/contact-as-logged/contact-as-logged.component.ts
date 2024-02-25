/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-contact-as-logged',
  templateUrl: './contact-as-logged.component.html',
})
export class ContactAsLoggedComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  loggedContactForm: FormGroup;

  constructor(private readonly _contactService: ContactService) {
    super();
    this.loggedContactForm = new FormGroup({
      issueType: new FormControl('', [Validators.required]),
      departmentName: new FormControl(''),
      groups: new FormControl([]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleSubmitNewLoggedContact(): void {
    this.wrapAsObservable$(
      this._contactService.sendLoggedUserContactFormMessage$(
        this.loggedContactForm.getRawValue()
      )
    ).subscribe({ next: () => this.loggedContactForm.reset({ groups: [] }) });
  }
}
