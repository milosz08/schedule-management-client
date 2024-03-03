/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { matArrowRightAlt } from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsPageComponent } from './cms-page.component';
import { CmsRoutingModule } from './cms-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { RouteProtectorGuard } from './guards/route-protector/route-protector.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MyMessagePageComponent } from './pages/my-message-page/my-message-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';
import { DomService } from './services/dom/dom.service';

@NgModule({
  declarations: [
    CmsPageComponent,
    DashboardPageComponent,
    FooterComponent,
    HeaderComponent,
    LeftNavigationComponent,
    MyMessagePageComponent,
    MyMessagesPageComponent,
  ],
  imports: [
    CmsRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
    }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [DomService, RouteProtectorGuard],
  exports: [],
})
export class CmsModule {}
