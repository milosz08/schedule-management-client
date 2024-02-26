/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  matArrowRightAlt,
  matKeyboardArrowDown,
  matVisibility,
  matVisibilityOff,
} from '@ng-icons/material-icons/baseline';
import { BasicCopyFooterComponent } from './components/basic-copy-footer/basic-copy-footer.component';
import { CheckboxTemplateComponent } from './components/checkbox-template/checkbox-template.component';
import { ComboBoxTemplateComponent } from './components/combo-box-template/combo-box-template.component';
import { EndSessionModalComponent } from './components/end-session-modal/end-session-modal.component';
import { LoadingSuspenseCardComponent } from './components/loading-suspense-card/loading-suspense-card.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { SelectDropBoxTemplateComponent } from './components/select-drop-box-template/select-drop-box-template.component';
import { SelectListTemplateComponent } from './components/select-list-template/select-list-template.component';
import { SnackbarsContainerComponent } from './components/snackbars-container/snackbars-container.component';
import { TextInputPasswordComponent } from './components/text-input-password/text-input-password.component';
import { UserDetailsPopupComponent } from './components/user-details-popup/user-details-popup.component';
import { UserHeaderDataWithPopupComponent } from './components/user-header-data-with-popup/user-header-data-with-popup.component';
import { UserImageComponent } from './components/user-image/user-image.component';
import { UserRoleDotComponent } from './components/user-role-dot/user-role-dot.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { UserIdentityPipe } from './pipes/user-identity/user-identity.pipe';

@NgModule({
  declarations: [
    BasicCopyFooterComponent,
    CheckboxTemplateComponent,
    ComboBoxTemplateComponent,
    EndSessionModalComponent,
    LoadingSuspenseCardComponent,
    LogoutModalComponent,
    NotFoundPageComponent,
    SelectDropBoxTemplateComponent,
    SelectListTemplateComponent,
    SnackbarsContainerComponent,
    TextInputPasswordComponent,
    UserDetailsPopupComponent,
    UserHeaderDataWithPopupComponent,
    UserIdentityPipe,
    UserImageComponent,
    UserRoleDotComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
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
    EndSessionModalComponent,
    LoadingSuspenseCardComponent,
    LogoutModalComponent,
    SelectDropBoxTemplateComponent,
    SelectListTemplateComponent,
    SnackbarsContainerComponent,
    TextInputPasswordComponent,
    UserHeaderDataWithPopupComponent,
    UserIdentityPipe,
    UserRoleDotComponent,
  ],
})
export class SharedModule {}
