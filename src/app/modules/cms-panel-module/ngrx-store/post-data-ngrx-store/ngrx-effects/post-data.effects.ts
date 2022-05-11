/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: post-data.effects.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 20:28
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

import { catchError, map, mergeMap, of } from 'rxjs';

import * as NgrxAction_PDE from '../post-data.actions';
import { PostDataReducerType } from '../post-data.selectors';

import { CmsPostConnectorService } from '../../../services/cms-post-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za usługi typu POST dokonywane w panelu administratora.
 */

@Injectable()
export class PostDataEffects {

    public constructor(
        private _action: Actions,
        private _store: Store<PostDataReducerType>,
        private _postConnectorService: CmsPostConnectorService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt inizalizujący rejestrację nowego użytkownika.
     */
    public registerNewUser$ =  createEffect(() => {
        return this._action.pipe(
            ofType(NgrxAction_PDE.__registerNewUser),
            mergeMap(action => {
                return this._postConnectorService
                    .registerUser(action.userData)
                    .pipe(
                        map(data => {
                            return NgrxAction_PDE.__successRegisterNewUser({ userData: data });
                        }),
                        catchError(() => {
                            return of(NgrxAction_PDE.__failureRegisterNewUser());
                        }),
                    );
            }),
        );
    });
}