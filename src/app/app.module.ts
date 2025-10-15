import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~/shared-module/shared.module';
import { titleStrategyProvider } from '~/shared-module/strategies/template-page-title.strategy';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { globalExceptionHandlerInterceptorInitializer } from './shared-module/interceptors/global-exceptions-handler/global-exceptions-handler.interceptor';
import { refreshSessionInterceptorInitializer } from './shared-module/interceptors/refresh-session/refresh-session.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
  ],
  providers: [
    titleStrategyProvider,
    globalExceptionHandlerInterceptorInitializer,
    refreshSessionInterceptorInitializer,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
