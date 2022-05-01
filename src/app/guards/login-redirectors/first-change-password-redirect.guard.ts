/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: first-change-password-redirect.guard.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 22:37
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
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppGlobalState } from '../../ngrx-store/combine-reducers';
import { FirstChangePasswordStorageService } from '../../services/first-change-password-storage.service';

/**
 * Redirektor przekierowujący na stronę główną w przypadku próby odwołania się do widoku zmiany pierwszego
 * hasła przez nieautoryzowanego użytkownika lub użytkownika który już zmienił hasło.
 */

@Injectable({
    providedIn: 'root',
})
export class FirstChangePasswordRedirectGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _store: Store<AppGlobalState>,
        private _storageService: FirstChangePasswordStorageService,
    ) {
    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._store.pipe(map(({ sessionReducer }) => {
            if (sessionReducer.userData) {
                const ifDisabled = this._storageService
                    .checkIfFirstChangePasswordIsDisabled(sessionReducer.userData.dictionaryHash);
                if (!sessionReducer.userData.firstAccess || ifDisabled) {
                    this._router.navigate([ '/' ]).then(r => r);
                }
            }
            return true;
        }));
    };
}