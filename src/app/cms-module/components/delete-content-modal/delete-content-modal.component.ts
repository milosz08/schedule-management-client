import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteContentService } from '~/cms-module/services/delete-content/delete-content.service';
import { fadeInOutAnimation } from '~/shared-module/animations/fade-in-out.animation';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-delete-content-modal',
  templateUrl: './delete-content-modal.component.html',
  styleUrl: './delete-content-modal.component.scss',
  animations: [fadeInOutAnimation],
})
export class DeleteContentModalComponent
  extends AbstractReactiveProvider
  implements OnDestroy
{
  passwordForm: FormGroup;

  isLoading$ = this._deleteContentService.isLoading$;
  isOpen$ = this._deleteContentService.isOpen$;

  constructor(private readonly _deleteContentService: DeleteContentService) {
    super();
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleDeleteElements(): void {
    const { password } = this.passwordForm.getRawValue();
    this.wrapAsObservable$(
      this._deleteContentService.deleteSelectedContent$(password)
    ).subscribe();
  }

  handleCloseModal(): void {
    this._deleteContentService.setIsOpen(false);
    this.passwordForm.reset();
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.passwordForm, controlName);
  }
}
