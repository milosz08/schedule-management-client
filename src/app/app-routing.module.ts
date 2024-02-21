/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-mod/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./module/root/root.module').then(m => m.RootModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./module/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('./module/cms/cms.module').then(m => m.CmsModule),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
