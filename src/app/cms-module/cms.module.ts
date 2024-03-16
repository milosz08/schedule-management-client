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
  matKeyboardArrowDown,
  matKeyboardArrowLeft,
  matKeyboardArrowRight,
  matKeyboardArrowUp,
  matKeyboardBackspace,
  matPlus,
  matRefresh,
  matSearch,
} from '@ng-icons/material-icons/baseline';
import { SharedModule } from '~/shared-module/shared.module';
import { CmsPageComponent } from './cms-page.component';
import { CmsRoutingModule } from './cms-routing.module';
import { AddEditSectionHeaderComponent } from './components/add-edit-section-header/add-edit-section-header.component';
import { DeleteContentModalComponent } from './components/delete-content-modal/delete-content-modal.component';
import { DeleteElementComponent } from './components/delete-element/delete-element.component';
import { DeletePageableElementsComponent } from './components/delete-pageable-elements/delete-pageable-elements.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftNavigationComponent } from './components/left-navigation/left-navigation.component';
import { PaginationOptionsComponent } from './components/pagination-options/pagination-options.component';
import { PlotDescriptionComponent } from './components/plot-description/plot-description.component';
import { RoundPlotComponent } from './components/round-plot/round-plot.component';
import { SearchFormInputComponent } from './components/search-form-input/search-form-input.component';
import { SortingButtonComponent } from './components/sorting-button/sorting-button.component';
import { TableDataHeaderComponent } from './components/table-data-header/table-data-header.component';
import { UserMessageDetailsComponent } from './components/user-message-details/user-message-details.component';
import { RouteProtectorGuard } from './guards/route-protector/route-protector.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MyMessagePageComponent } from './pages/my-message-page/my-message-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';
import { FromDashToCamelPipe } from './pipes/from-dash-to-camel/from-dash-to-camel.pipe';
import { DashboardHttpClientService } from './services/dashboard-http-client/dashboard-http-client.service';
import { DeleteContentHttpClientService } from './services/delete-content-http-client/delete-content-http-client.service';
import { DomService } from './services/dom/dom.service';
import { PaginationHttpClientService } from './services/pagination-http-client/pagination-http-client.service';
import { UserMessageHttpClientService } from './services/user-message-http-client/user-message-http-client.service';

@NgModule({
  declarations: [
    AddEditSectionHeaderComponent,
    CmsPageComponent,
    DashboardPageComponent,
    DeleteContentModalComponent,
    DeleteElementComponent,
    DeletePageableElementsComponent,
    FooterComponent,
    FromDashToCamelPipe,
    HeaderComponent,
    LeftNavigationComponent,
    MyMessagePageComponent,
    MyMessagesPageComponent,
    PaginationOptionsComponent,
    PlotDescriptionComponent,
    RoundPlotComponent,
    SearchFormInputComponent,
    SortingButtonComponent,
    TableDataHeaderComponent,
    UserMessageDetailsComponent,
  ],
  imports: [
    CmsRoutingModule,
    CommonModule,
    NgIconsModule.withIcons({
      matArrowRightAlt,
      matKeyboardArrowDown,
      matKeyboardArrowLeft,
      matKeyboardArrowRight,
      matKeyboardArrowUp,
      matKeyboardBackspace,
      matPlus,
      matRefresh,
      matSearch,
    }),
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    DashboardHttpClientService,
    DeleteContentHttpClientService,
    DomService,
    PaginationHttpClientService,
    RouteProtectorGuard,
    UserMessageHttpClientService,
  ],
  exports: [
    AddEditSectionHeaderComponent,
    DeleteContentModalComponent,
    DeleteElementComponent,
    DeletePageableElementsComponent,
    SearchFormInputComponent,
    SortingButtonComponent,
    TableDataHeaderComponent,
    UserMessageDetailsComponent,
  ],
})
export class CmsModule {}
