/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: end-session-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 28/04/2022, 19:18
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

import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import * as NgrxAction_SES from '../../ngrx-store/session-ngrx-store/session.actions';
import * as NgrxAction_MOD from '../../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxSelector_MOD from '../../ngrx-store/modals-ngrx-store/modals.selectors';
import { InitialSessionStateTypes } from '../../ngrx-store/session-ngrx-store/session.initial';

import { EndSessionModalSequencerService } from '../../services/end-session-modal-sequencer.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku modala otwierającego się automatycznie przy końcu sesji.
 */

@Component({
    selector: 'app-end-session-modal',
    templateUrl: './end-session-modal.component.html',
    styleUrls: [],
    animations: [ fadeInOutAnimation ],
})
export class EndSessionModalComponent implements OnDestroy {

    public _modalVisibility$ = this._store.select(NgrxSelector_MOD.sel_sessionEndModalVisibility);
    public _sequencerMaxInactivity = this._endSessionModalSequencerService.__sequencerMaxInactivityInSeconds;
    public _sequencerCurrValue$ = this._endSessionModalSequencerService._sequencerCurrentValue$;

    private _subscription$: Subscription;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
        private _endSessionModalSequencerService: EndSessionModalSequencerService,
    ) {
        this._subscription$ = this._modalVisibility$.subscribe(visibility => {
            if (visibility) {
                this._endSessionModalSequencerService.onInitSequencerStart();
            }
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._endSessionModalSequencerService.sequencerForceStop();
        this._subscription$.unsubscribe();
    };

    public handleCloseModalAndRenewSession(): void {
        this._store.dispatch(NgrxAction_SES.__renewSession());
        this._endSessionModalSequencerService.sequencerForceStop();
    };

    public handleCloseModalAndLogoutUser(): void {
        this._store.dispatch(NgrxAction_SES.__logout({ ifRedirectToRoot: true }));
        this._store.dispatch(NgrxAction_MOD.__sessionSetModalVisibility({ modalVisibility: false }));
        this._endSessionModalSequencerService.sequencerForceStop();
    };
}