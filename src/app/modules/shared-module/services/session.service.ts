/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.service.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 18:17
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
import { Store } from '@ngrx/store';

import { Observable, Subject, throttleTime } from 'rxjs';

import { ModalsReducerType } from '../ngrx-store/modals-ngrx-store/modals.selectors';
import { SessionReducerType } from '../ngrx-store/session-ngrx-store/session.selectors';
import { AuthResponseDataModel } from '../../../models/auth-response-data.model';

import * as NgrxAction_MOD from '../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxAction_SES from '../ngrx-store/session-ngrx-store/session.actions';
import * as NgrxSelector_SES from '../ngrx-store/session-ngrx-store/session.selectors';

import { AuthService } from './auth.service';

//----------------------------------------------------------------------------------------------------------------------

type CombinedReducers = SessionReducerType | ModalsReducerType;

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za zarządzanie sesją użytkownika.
 */

@Injectable()
export class SessionService {

    private subscriber$ = new Subject();
    private tokenRefreshSeconds$: Observable<number> = this._store.select(NgrxSelector_SES.sel_tokenRefreshInSeconds);

    private _timeoutInterval?: number;
    private _jwtRefresherInterval?: number;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _authService: AuthService,
        private _store: Store<CombinedReducers>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Rejestrowanie czasu sesji użytkownika, po jej przekroczeniu wyświetlenie modala z informacją o
     * automatycznym wylogowaniu za X sekund.
     */
    public sessionStartInterval(tokenRefreshSeconds: number): void {
        let counting: number = tokenRefreshSeconds;
        const sequencer = (): void => {
            this._store.dispatch(NgrxAction_SES.__sessionSetTime({ time: counting }));
            if (counting-- <= 0) {
                this._store.dispatch(NgrxAction_MOD.__sessionSetModalVisibility({ modalVisibility: true }));
                this.sessionEndInterval();
            }
        };
        this._timeoutInterval = setInterval(sequencer, 1000);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Ponowne uruchomienie sesji użytkownika.
     */
    public sessionRerunInterval(tokenRefreshSeconds: number) {
        clearInterval(this._timeoutInterval);
        this.sessionStartInterval(tokenRefreshSeconds);
    }

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Rozpoczęcie działania sekwencera odświeżającego token JWT oraz uruchamianie aktywnej sesji użytkownika.
     */
    public allSessionCountersRerun(data: AuthResponseDataModel): void {
        this.sessionStartInterval(data.tokenRefreshInSeconds);
        this.refreshingJwtTokenIntervals(data.tokenRefreshInSeconds, data);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Sekwencer odświeżający token JWT co X - 1000ms czasu w zależności od końca ważności tokena.
     */
    public refreshingJwtTokenIntervals(intervalSeconds: number, data: AuthResponseDataModel): void {
        this._jwtRefresherInterval = setInterval(() => {
            this._store.dispatch(NgrxAction_SES.__setNewToken({ data }));
        }, intervalSeconds * 1000 - 1000);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zakończenie rejestrowania czasu sesji użytkownika.
     */
    public sessionEndInterval(): void {
        clearInterval(this._jwtRefresherInterval);
        clearInterval(this._timeoutInterval);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Potok RXJS odpowiadający za uruchomienie odliczania czasu sesji od początku. Dodatkowo posiada zabezpieczenie
     * w postaci multiplikowania kliknięć przez użytkownika (obiekt subskrybuje się tylko co 1 sekundę niezależnie od
     * częstotliwości kliknięć w gówną kanwę).
     */
    public refreshSession(): void {
        this.subscriber$.pipe(
            throttleTime(1000),
        ).subscribe(() => {
            this.tokenRefreshSeconds$.subscribe(refreshInSeconds => {
                if (refreshInSeconds) {
                    this.sessionRerunInterval(refreshInSeconds);
                }
            });
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda uruchamiająca się przy każdym naciścięciu na główną kanwę aplikacji.
     */
    public invokeRefreshSession(e: MouseEvent): void {
        this.subscriber$.next(e);
    };
}