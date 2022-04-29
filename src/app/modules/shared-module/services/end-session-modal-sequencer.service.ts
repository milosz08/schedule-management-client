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

import { BehaviorSubject } from 'rxjs';

/**
 * Serwis realizujący logikę sekwencera odliczającego czas od automatycznego otworzenia modala z informacją
 * o końcu sesji. Głównym jego elementem jest BehaviorSubject, który emituje wartość przy każdej sekundzie.
 */

@Injectable({
    providedIn: 'root',
})
export class EndSessionModalSequencerService {

    private readonly _sequencerMaxInactivityInSeconds: number = 30;
    private readonly _savedPageTitle: string = this._titleService.getTitle();
    private readonly _warningAudio: HTMLMediaElement = new Audio('assets/sounds/session-warning.mp3');
    public readonly _sequencerCurrentValue$: BehaviorSubject<number>;

    private _sequcenterIndex?: number;

    public constructor(
        private _titleService: Title,
    ) {
        this._sequencerCurrentValue$ = new BehaviorSubject<number>(this._sequencerMaxInactivityInSeconds);
    };

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
                this.sequencerForceStop();
            }
        };
        this._sequcenterIndex = setInterval(sequencerCallback, 1000)
    };

    public sequencerForceStop(): void {
        clearInterval(this._sequcenterIndex!);
        this._titleService.setTitle(this._savedPageTitle);
    };

    get __sequencerMaxInactivityInSeconds(): number {
        return this._sequencerMaxInactivityInSeconds;
    };
}