import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from '~/shared-module/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./root-module/root.module').then(m => m.RootModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth-module/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'secure',
    loadChildren: () =>
      import('./cms-module/cms.module').then(m => m.CmsModule),
  },
  { path: '**', component: NotFoundPageComponent, title: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
