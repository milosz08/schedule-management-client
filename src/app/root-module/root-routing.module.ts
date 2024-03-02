/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { activateScheduleParametersGuard } from './guards/schedule-parameters/schedule-parameters.guard';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { RootMainPageComponent } from './pages/root-main-page/root-main-page.component';
import { SchedulePageComponent } from './pages/schedule-page/schedule-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SelectedSchedulePageComponent } from './pages/selected-schedule-page/selected-schedule-page.component';
import { WelcomeSchedulePageComponent } from './pages/welcome-schedule-page/welcome-schedule-page.component';
import { RootPageComponent } from './root-page.component';

const routes: Routes = [
  {
    path: '',
    component: RootPageComponent,
    children: [
      {
        path: '',
        component: RootMainPageComponent,
        title: 'Strona Główna',
      },
      {
        path: 'schedule',
        component: SchedulePageComponent,
        title: 'Plan zajęć',
        children: [
          {
            path: '',
            component: WelcomeSchedulePageComponent,
          },
          {
            path: 'selected-schedule',
            component: SelectedSchedulePageComponent,
            canActivate: [activateScheduleParametersGuard],
          },
        ],
      },
      {
        path: 'contact',
        component: ContactPageComponent,
        title: 'Kontakt',
      },
      {
        path: 'search',
        component: SearchPageComponent,
        title: 'Szukaj',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
