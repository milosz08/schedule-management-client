/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ContactService } from '~/root-module/services/contact/contact.service';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';
import { NameWithId } from '~/shared-module/types/drop-lists-data.type';

@Component({
  selector: 'app-contact-form-elements',
  templateUrl: './contact-form-elements.component.html',
})
export class ContactFormElementsComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() formData!: FormGroup;

  departments: string[] = [];
  messageTypes: string[] = [];
  groups: NameWithId[] = [];
  isScheduleIssueVisible = false;

  isLoading$ = this._contactService.isLoading$;

  constructor(private readonly _contactService: ContactService) {
    super();
  }

  ngOnInit(): void {
    this.wrapAsObservable$(
      this._contactService.fetchContactMessageIssueTypes$()
    ).subscribe(messageTypes => (this.messageTypes = messageTypes));
    this.wrapAsObservable$(this._contactService.fetchDepartments$()).subscribe(
      departments => (this.departments = departments)
    );
    this.wrapAsObservable$(
      this._contactService.fetchGroupsBaseDepartment$()
    ).subscribe(groups => (this.groups = groups));
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }

  handleEmitQueryAfterSetType(query?: string): void {
    this._contactService.updateTypeQuery(query);
  }

  handleEmitDepartmentQuery(query?: string): void {
    this._contactService.updateDepartmentQuery(query);
  }

  handleChooseBookingType(): void {
    this.isScheduleIssueVisible =
      this.formData.get('issueType')?.value === 'nieprawidłowe dane w planie';
    if (this.isScheduleIssueVisible) {
      this.handleEmitDepartmentQuery();
    }
  }

  handleChooseDepartment(): void {
    this._contactService.setDepartmentName(
      this.formData.get('departmentName')?.value
    );
  }

  checkIsFieldHasErrors(controlName: string): boolean {
    return this.checkFormFieldErrors(this.formData, controlName);
  }
}
