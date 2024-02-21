/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared-mod/shared.module';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { RootMainPageComponent } from './pages/root-main-page/root-main-page.component';
import { RootPageComponent } from './root-page.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [
    RootPageComponent,
    MainFooterComponent,
    MainHeaderComponent,
    RootMainPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RootRoutingModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class RootModule {}
