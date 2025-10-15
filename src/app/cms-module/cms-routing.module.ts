import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-module/pages/not-found-page/not-found-page.component';
import { CmsPageComponent } from './cms-page.component';
import {
  activateAdminRouteProtectorGuard,
  activateBaseRouteProtectorGuard,
  activateEditorRouteProtectorGuard,
  activateStudentAndTeacherRouteProtectorGuard,
} from './guards/route-protector/route-protector.guard';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MyMessagePageComponent } from './pages/my-message-page/my-message-page.component';
import { MyMessagesPageComponent } from './pages/my-messages-page/my-messages-page.component';

const routes: Routes = [
  {
    path: '',
    component: CmsPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        title: 'Panel główny',
        canActivate: [activateBaseRouteProtectorGuard],
      },
      {
        path: 'my-messages',
        component: MyMessagesPageComponent,
        title: 'Moje wiadomości',
        canActivate: [activateStudentAndTeacherRouteProtectorGuard],
      },
      {
        path: 'my-messages/details/:messId',
        component: MyMessagePageComponent,
        title: 'Szczegóły wiadomości',
        canActivate: [activateStudentAndTeacherRouteProtectorGuard],
      },
      {
        path: 'editor',
        loadChildren: () =>
          import('~/cms-editor-module/cms-editor.module').then(
            m => m.CmsEditorModule
          ),
        canActivate: [activateEditorRouteProtectorGuard],
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('~/cms-admin-module/cms-admin.module').then(
            m => m.CmsAdminModule
          ),
        canActivate: [activateAdminRouteProtectorGuard],
      },
      {
        path: '**',
        component: NotFoundPageComponent,
        title: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmsRoutingModule {}
