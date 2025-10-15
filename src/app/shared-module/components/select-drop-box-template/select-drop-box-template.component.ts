import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { AbstractReactiveProvider } from '../abstract-reactive-provider';

@Component({
  selector: 'app-select-drop-box-template',
  templateUrl: './select-drop-box-template.component.html',
  styleUrl: './select-drop-box-template.component.scss',
})
export class SelectDropBoxTemplateComponent
  extends AbstractReactiveProvider
  implements OnInit, OnChanges, OnDestroy
{
  @Input() formGroup?: FormGroup;
  @Input() formControlId = '';
  @Input() selectId = '';
  @Input() placeholder = '';
  @Input() errorField = '';
  @Input() optionsList: string[] = [];
  @Input() isErrorsDisabled = false;

  @Output() emitNewQuery = new EventEmitter<string>();
  @Output() addedValue = new EventEmitter<void>();
  @Output() addedValueWithResult = new EventEmitter<string>();

  searchQuery$ = new Subject<string>();
  isListVisible = false;

  ngOnInit(): void {
    this.wrapAsObservable$(
      this.searchQuery$.pipe(debounceTime(400), distinctUntilChanged())
    ).subscribe(textQuery => this.emitNewQuery.emit(textQuery));
  }

  ngOnChanges(): void {
    const formControl = this.formGroup?.get(this.formControlId);
    if (this.isErrorsDisabled || !formControl) {
      return;
    }
    this.wrapAsObservable$(formControl.valueChanges).subscribe(data => {
      formControl.setErrors(
        this.optionsList.includes(data as string) ? null : { error: true }
      );
    });
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleInsertInput(event: Event): void {
    this.searchQuery$.next((event.target as HTMLInputElement).value);
  }

  handleOpenListVisibility(): void {
    this.isListVisible = true;
  }

  handleCloseListVisibility(): void {
    setTimeout(() => (this.isListVisible = false), 200);
  }

  handleSelectSingleListElement(value: string): void {
    this.formGroup?.patchValue({ [this.formControlId]: value });
    if (this.addedValue && this.formGroup?.get(this.formControlId)!.valid) {
      this.addedValue.emit();
      this.addedValueWithResult.emit(value);
    }
    this.isListVisible = false;
  }

  validateFormField(): boolean {
    if (!this.formGroup) {
      return false;
    }
    return this.checkFormFieldErrors(this.formGroup, this.formControlId);
  }
}
