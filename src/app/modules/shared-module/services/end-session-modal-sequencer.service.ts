/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: end-session-modal-sequencer.service.ts
 * Last modified | Ostatnia modyfikacja: 29/04/2022, 23:13
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

import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';

import { BehaviorSubject } from 'rxjs';

import * as NgrxAction_MOD from '../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxAction_SES from '../ngrx-store/session-ngrx-store/session.actions';
import { SessionReducerType } from '../ngrx-store/session-ngrx-store/session.selectors';
import * as NgrxAction_SMA from '../../cms-panel-module/ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.actions';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis realizujący logikę sekwencera odliczającego czas od automatycznego otworzenia modala z informacją
 * o końcu sesji. Głównym jego elementem jest BehaviorSubject, który emituje wartość przy każdej sekundzie.
 */

@Injectable()
export class EndSessionModalSequencerService {

    private readonly _sequencerMaxInactivityInSeconds: number = 30;
    private readonly _savedPageTitle: string = this._titleService.getTitle();
    private readonly _warningAudio: HTMLMediaElement = new Audio('assets/sounds/session-warning.mp3');
    public readonly _sequencerCurrentValue$: BehaviorSubject<number>;

    private _sequcenterIndex?: number;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _titleService: Title,
        private _store: Store<SessionReducerType>,
    ) {
        this._sequencerCurrentValue$ = new BehaviorSubject<number>(this._sequencerMaxInactivityInSeconds);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Uruchomienie sekwencji odliczania do automatycznego wylogowania z systemu.
     */
    public onInitSequencerStart(): void {
        let sequenceLeftTime: number = this._sequencerMaxInactivityInSeconds;
        const sequencerCallback = (): void => {
            this._sequencerCurrentValue$.next(sequenceLeftTime);
            this._titleService.setTitle(`Pozostało ${sequenceLeftTime} sekund do wylogowania!`);
            if (sequenceLeftTime % 5 === 0) {
                this._warningAudio.play().then(r => r);
            }
            if (sequenceLeftTime-- === 0) {
                this._titleService.setTitle(this._savedPageTitle);
                this._store.dispatch(NgrxAction_SES.__logout({ ifRedirectToRoot: true }));
                this._store.dispatch(NgrxAction_SMA.__setModalClose());
                this._store.dispatch(NgrxAction_MOD.__sessionSetModalVisibility({ modalVisibility: false }));
                this.sequencerForceStop();
            }
        };
        this._sequcenterIndex = setInterval(sequencerCallback, 1000)
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Wyłączenie sekwencji odliczającej do automatycznego wylogowania.
     */
    public sequencerForceStop(): void {
        clearInterval(this._sequcenterIndex!);
        this._titleService.setTitle(this._savedPageTitle);
    };

    //------------------------------------------------------------------------------------------------------------------

    get __sequencerMaxInactivityInSeconds(): number {
        return this._sequencerMaxInactivityInSeconds;
    };
}