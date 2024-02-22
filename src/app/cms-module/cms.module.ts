/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsPageComponent } from './cms-page.component';
import { CmsRoutingModule } from './cms-routing.module';

@NgModule({
  declarations: [CmsPageComponent],
  imports: [
    CmsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [],
  exports: [],
})
export class CmsModule {}
