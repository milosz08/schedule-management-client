/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.guard.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 15:53
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

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, Observable } from 'rxjs';

import * as NgrxSelector_RES from '../../modules/auth-module/ngrx-store/reset-password-ngrx-store/reset-password.selectors';
import { ResetPasswordReducerType } from '../../modules/auth-module/ngrx-store/reset-password-ngrx-store/reset-password.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Redirektor przekierowujący na stronę zmiany hasła, jeśli w trasie nie został podany token JWT oraz jeśli token
 * ten jest błędny (inny od tego zwróconego w z backendu).
 */

@Injectable({
    providedIn: 'root',
})
export class ResetPasswordGuard implements CanActivate {

    private readonly _bearerToken$: Observable<string> = this._store
        .select(NgrxSelector_RES.sel_ifResetPasswordBearerToken);

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _router: Router,
        private _store: Store<ResetPasswordReducerType>
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._bearerToken$.pipe(map(bearerToken => {
            if (!bearerToken || bearerToken !== route.queryParamMap.get('token')) {
                this._router.navigate([ '/auth/send-token-to-reset-password' ]).then(r => r);
            }
            return true;
        }));
    };
}