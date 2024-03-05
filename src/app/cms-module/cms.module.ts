/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import {
  matArrowRightAlt,
  matKeyboardBackspace,
  matPlus,
  matSearch,
} from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsPageComponent } from './cms-page.component';
import { CmsRoutingModule } from './cms-routing.module';
import { AddEditSectionHeaderComponent } from './components/add-edit-section-header/add-edit-section-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { SearchFormInputComponent } from './components/search-form-input/search-form-input.component';
import { TableDataHeaderComponent } from './components/table-data-header/table-data-header.component';
import { RouteProtectorGuard } from './guards/route-protector/route-protector.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MyMessagePageComponent } from './pages/my-message-page/my-message-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';
import { DomService } from './services/dom/dom.service';

@NgModule({
  declarations: [
    AddEditSectionHeaderComponent,
    CmsPageComponent,
    DashboardPageComponent,
    FooterComponent,
    HeaderComponent,
    LeftNavigationComponent,
    MyMessagePageComponent,
    MyMessagesPageComponent,
    SearchFormInputComponent,
    TableDataHeaderComponent,
  ],
  imports: [
    CmsRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
      matKeyboardBackspace,
      matPlus,
      matSearch,
    }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [DomService, RouteProtectorGuard],
  exports: [
    AddEditSectionHeaderComponent,
    SearchFormInputComponent,
    TableDataHeaderComponent,
  ],
})
export class CmsModule {}
