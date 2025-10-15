import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExtendedContactFormReq } from '~/root-module/models/contact-form.model';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-contact-as-anonymous',
  templateUrl: './contact-as-anonymous.component.html',
})
export class ContactAsAnonymousComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  anonymousContactForm: FormGroup;

  isLoading$ = this._contactService.isLoading$;

  constructor(private readonly _contactService: ContactService) {
    super();
    this.anonymousContactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
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

  handleSubmitAnonymousContactForm(): void {
    this.wrapAsObservable$(
      this._contactService.sendAnonymousContactFormMessage$(
        this.anonymousContactForm.getRawValue() as ExtendedContactFormReq
      )
    ).subscribe({
      next: () => this.anonymousContactForm.reset({ groups: [] }),
    });
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.anonymousContactForm, controlName);
  }
}
