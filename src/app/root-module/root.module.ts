/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowRightAlt, matSearch } from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { ContactAsAnonymousComponent } from './components/contact-as-anonymous/contact-as-anonymous.component';
import { ContactAsLoggedComponent } from './components/contact-as-logged/contact-as-logged.component';
import { ContactFormElementsComponent } from './components/contact-form-elements/contact-form-elements.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { RootMainPageComponent } from './pages/root-main-page/root-main-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { WelcomeSchedulePageComponent } from './pages/welcome-schedule-page/welcome-schedule-page.component';
import { RootPageComponent } from './root-page.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [
    ContactAsAnonymousComponent,
    ContactAsLoggedComponent,
    ContactFormElementsComponent,
    ContactPageComponent,
    MainFooterComponent,
    MainHeaderComponent,
    RootMainPageComponent,
    RootPageComponent,
    SchedulePageComponent,
    SearchPageComponent,
    WelcomeSchedulePageComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ matArrowRightAlt, matSearch }),
    ReactiveFormsModule,
    RootRoutingModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class RootModule {}
