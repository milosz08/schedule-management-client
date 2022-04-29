/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.service.ts
 * Last modified | Ostatnia modyfikacja: 29/04/2022, 16:03
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

import { InitialSessionStateTypes } from '../ngrx-store/session-ngrx-store/session.initial';
import { getTokenRefreshInSeconds } from '../ngrx-store/session-ngrx-store/session.selectors';
import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';

import {
    userSessionSetModalVisibility, userSessionSetTime, userSetNewToken
} from '../ngrx-store/session-ngrx-store/session.actions';

import { AuthService } from './auth.service';

/**
 * Serwis odpowiedzialny za zarządzanie sesją użytkownika.
 */

@Injectable({
    providedIn: 'root'
})
export class SessionService {

    private subscriber$ = new Subject();
    private tokenRefreshSeconds$: Observable<number> = this._store.select(getTokenRefreshInSeconds);

    private _timeoutInterval?: number;
    private _jwtRefresherInterval?: number;

    public constructor(
        private _store: Store<InitialSessionStateTypes>,
        private _authService: AuthService,
    ) {
    };

    /**
     * Rejestrowanie czasu sesji użytkownika, po jej przekroczeniu wyświetlenie modala z informacją o
     * automatycznym wylogowaniu za X sekund.
     */
    public sessionStartInterval(tokenRefreshSeconds: number): void {
        let counting: number = tokenRefreshSeconds;
        this._store.dispatch(userSessionSetTime({ time: counting }));
        const sequencer = (): void => {
            this._store.dispatch(userSessionSetTime({ time: counting }));
            if (counting-- <= 0) {
                this._store.dispatch(userSessionSetModalVisibility({ modalVisibility: true }));
                this.sessionEndInterval();
            }
        };
        this._timeoutInterval = setInterval(sequencer, 1000);
    };

    public sessionRerunInterval(tokenRefreshSeconds: number) {
        clearInterval(this._timeoutInterval);
        this.sessionStartInterval(tokenRefreshSeconds);
    }

    /**
     * Rozpoczęcie działania sekwencera odświeżającego token JWT oraz uruchamianie aktywnej sesji użytkownika.
     */
    public allSessionCountersRerun(data: AuthResponseDataModel): void {
        this.sessionStartInterval(data.tokenRefreshInSeconds);
        this.refreshingJwtTokenIntervals(data.tokenRefreshInSeconds, data);
    };

    /**
     * Sekwencer odświeżający token JWT co X - 1000ms czasu w zależności od końca ważności tokena.
     */
    public refreshingJwtTokenIntervals(intervalSeconds: number, data: AuthResponseDataModel): void {
        this._jwtRefresherInterval = setInterval(() => {
            this._store.dispatch(userSetNewToken({ data }));
        }, intervalSeconds * 1000 - 1000);
    };

    /**
     * Zakończenie rejestrowania czasu sesji użytkownika.
     */
    public sessionEndInterval(): void {
        clearInterval(this._jwtRefresherInterval);
        clearInterval(this._timeoutInterval);
    };

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

    /**
     * Metoda uruchamiająca się przy każdym naciścięciu na główną kanwę aplikacji.
     */
    public invokeRefreshSession(e: MouseEvent): void {
        this.subscriber$.next(e);
    };
}