/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: shared.module.ts
 * Last modified | Ostatnia modyfikacja: 10/04/2022, 00:52
 * Project name | Nazwa Projektu: angular-po-schedule-management-client
 *
 * Klient | Client: <https://github.com/Milosz08/Angular_PO_Schedule_Management_Client>
 * Serwer | Server: <https://github.com/Milosz08/ASP.NET_PO_Schedule_Management_Server>
 *
 * Client for the ASP.NET Core application to manage schedule for sample university. Written with the Angular Framework
 * for generating dynamic web applications. Project for the teaching course "Objected Oriented Programming".
 *
 * Klient dla aplikacji ASP.NET Core służącej do zarządzania planem zajęć uczelni. Napisany przy użyciu frameworka
 * Angular do generowania dynamicznych aplikacji webowych. Projekt wykonany na zajęcia "Programowanie
 * Obiektowe".
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NotFoundPageComponent } from './pages/not-found-page/not-found.component';

import { UserImageComponent } from './components/user-image/user-image.component';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { EndSessionModalComponent } from './components/end-session-modal/end-session-modal.component';
import { UserDetailsPopupComponent } from './components/user-details-popup/user-details-popup.component';
import { LoadingSuspenseCardComponent } from './components/loading-suspense-card/loading-suspense-card.component';
import { UserHeaderDataWithPopupComponent } from './components/user-header-data-with-popup/user-header-data-with-popup.component';

import { modalsReducer } from './ngrx-store/modals-ngrx-store/modals.reducer';
import { MODALS_REDUCER } from './ngrx-store/modals-ngrx-store/modals.selectors';
import { sessionReducer } from './ngrx-store/session-ngrx-store/session.reducer';
import { SESSION_REDUCER } from './ngrx-store/session-ngrx-store/session.selectors';
import { sharedReducer } from './ngrx-store/shared-ngrx-store/shared.reducer';
import { SHARED_REDUCER } from './ngrx-store/shared-ngrx-store/shared.selectors';

import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { SuspenseService } from './services/suspense.service';
import { BrowserStorageService } from './services/browser-storage.service';
import { ImageManipulationService } from './services/image-manipulation.service';
import { EndSessionModalSequencerService } from './services/end-session-modal-sequencer.service';

import { SharedEffects } from './ngrx-store/shared-ngrx-store/ngrx-effects/shared.effects';
import { JwtSessionEffects } from './ngrx-store/session-ngrx-store/ngrx-effects/jwt-session.effects';
import { LoginSessionEffects } from './ngrx-store/session-ngrx-store/ngrx-effects/login-session.effects';
import { LoginHelpersEffects } from './ngrx-store/session-ngrx-store/ngrx-effects/login-helpers.effects';

//----------------------------------------------------------------------------------------------------------------------

@NgModule({
    declarations: [
        // strony
        NotFoundPageComponent,
        // komponenty
        UserImageComponent,
        LogoutModalComponent,
        EndSessionModalComponent,
        UserDetailsPopupComponent,
        LoadingSuspenseCardComponent,
        UserHeaderDataWithPopupComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        // ngrx story
        StoreModule.forFeature(MODALS_REDUCER, modalsReducer),
        StoreModule.forFeature(SHARED_REDUCER, sharedReducer),
        StoreModule.forFeature(SESSION_REDUCER, sessionReducer),
        // ngrx effects
        EffectsModule.forFeature([
            SharedEffects,
            JwtSessionEffects,
            LoginSessionEffects,
            LoginHelpersEffects,
        ]),
    ],
    providers: [
        AuthService,
        SessionService,
        SuspenseService,
        BrowserStorageService,
        ImageManipulationService,
        EndSessionModalSequencerService,
    ],
    exports: [
        LoadingSuspenseCardComponent,
        UserHeaderDataWithPopupComponent,
        EndSessionModalComponent,
        LogoutModalComponent,
    ],
})
export class SharedModule {}