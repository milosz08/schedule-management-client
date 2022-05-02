/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: shared.effects.ts
 * Last modified | Ostatnia modyfikacja: 30/04/2022, 17:50
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
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { tap } from 'rxjs';

import * as NgrxAction_SHA from '../shared.actions';
import { SharedReducerType } from '../shared.selectors';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis efektów dla obsługi dziedziczonego ngrx stora (dla całej aplikacji).
 */

@Injectable()
export class SharedEffects {

    public constructor(
        private _actions$: Actions,
        private _store: Store<SharedReducerType>,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt uruchamiany podczas wywoływania zapytania do stora do ustawiania kontentu leniwego ładowania.
     * Przy uruchomionym leniwym ładowaniu dodaje klasę uniemożliwiającą scrollowanie strony.
     */
    public disablePageScrollOnSuspense$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_SHA.__setSuspenseLoader),
            tap(action => {
                if (action.status) {
                    document.body.classList.add('app--disable-scroll');
                } else {
                    document.body.classList.remove('app--disable-scroll');
                }
            }),
        );
    }, { dispatch: false });

}