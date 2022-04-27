/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: admin-redirect.guard.ts
 * Last modified | Ostatnia modyfikacja: 27/04/2022, 10:33
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
import { getIfUserNotLogged } from '../../ngrx-store/session-ngrx-store/session.selectors';
import { InitialSessionStateTypes } from '../../ngrx-store/session-ngrx-store/session.initial';

/**
 * Redirektor przekierowujący na stronę logowania w przypadku próby odwołania się do panelu zarządzania treścią
 * przez niezalogowanego użytkownika.
 */

@Injectable({
    providedIn: 'root',
})
export class AdminRedirectGuard implements CanActivate {

    private readonly _ifNotLogged$: Observable<boolean> = this._store.select(getIfUserNotLogged);

    constructor(
        private _router: Router,
        private _store: Store<InitialSessionStateTypes>
    ) {
    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._ifNotLogged$.pipe(map(authenticate => {
            if (authenticate) {
                this._router.navigate([ '/auth/login' ]).then(r => r);
            }
            return true;
        }));
    };
}