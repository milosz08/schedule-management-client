/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { AbstractReactiveProvider } from '~/shared-module/components/abstract-reactive-provider';

@Component({
  selector: 'app-search-form-input',
  templateUrl: './search-form-input.component.html',
  styleUrl: './search-form-input.component.scss',
})
export class SearchFormInputComponent
  extends AbstractReactiveProvider
  implements OnInit, OnDestroy
{
  @Input() inputPlaceholder = '';

  inputId = '';

  ngOnInit(): void {
    this.inputId = `${this.inputPlaceholder.replaceAll(' ', '_')}__text__${uuidv4()}`;
  }

  ngOnDestroy(): void {
    this.unmountAllSubscriptions();
  }
}
