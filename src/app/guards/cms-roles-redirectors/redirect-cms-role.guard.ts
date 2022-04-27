/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: redirect-cms-role.guard.ts
 * Last modified | Ostatnia modyfikacja: 27/04/2022, 10:51
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

import { map, Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { getUserIdentity } from '../../ngrx-store/session-ngrx-store/session.selectors';
import { InitialSessionStateTypes } from '../../ngrx-store/session-ngrx-store/session.initial';
import { UserIdentityModel } from '../../ngrx-store/session-ngrx-store/ngrx-models/user-identity.model';

/**
 * Uniwersalny redirektor zasobów związanych z rolami użytkowników. Aby użyć należy rozszerzyć klasę o tą
 * z dodaniem wywołania konstruktora klasy bazowej z użyciem super.
 */

export class RedirectCmsRoleGuard implements CanActivate {

    private readonly _userIdentity$: Observable<UserIdentityModel> = this._store.select(getUserIdentity);
    private readonly _userCurrentRole: UserIdentityModel;

    constructor(
        private _router: Router,
        private _store: Store<InitialSessionStateTypes>,
        userCurrentRole: UserIdentityModel,
    ) {
        this._userCurrentRole = userCurrentRole;
    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
        return this._userIdentity$.pipe(map(userRole => {
            if (userRole !== this._userCurrentRole) {
                this._router.navigate([ '/secure/admin-panel/dashboard' ]).then(r => r);
            }
            return true;
        }));
    };
}