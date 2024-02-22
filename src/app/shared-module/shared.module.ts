/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  matKeyboardArrowDown,
  matVisibility,
  matVisibilityOff,
} from '@ng-icons/material-icons/baseline';
import { BasicCopyFooterComponent } from './components/basic-copy-footer/basic-copy-footer.component';
import { CheckboxTemplateComponent } from './components/checkbox-template/checkbox-template.component';
import { ComboBoxTemplateComponent } from './components/combo-box-template/combo-box-template.component';
import { LoadingSuspenseCardComponent } from './components/loading-suspense-card/loading-suspense-card.component';
import { SelectDropBoxTemplateComponent } from './components/select-drop-box-template/select-drop-box-template.component';
import { SelectListTemplateComponent } from './components/select-list-template/select-list-template.component';
import { TextInputPasswordComponent } from './components/text-input-password/text-input-password.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

@NgModule({
  declarations: [
    BasicCopyFooterComponent,
    CheckboxTemplateComponent,
    ComboBoxTemplateComponent,
    LoadingSuspenseCardComponent,
    NotFoundPageComponent,
    SelectDropBoxTemplateComponent,
    SelectListTemplateComponent,
    TextInputPasswordComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      matKeyboardArrowDown,
      matVisibility,
      matVisibilityOff,
    }),
  ],
  providers: [],
  exports: [
    BasicCopyFooterComponent,
    CheckboxTemplateComponent,
    ComboBoxTemplateComponent,
    LoadingSuspenseCardComponent,
    SelectDropBoxTemplateComponent,
    SelectListTemplateComponent,
    TextInputPasswordComponent,
  ],
})
export class SharedModule {}
