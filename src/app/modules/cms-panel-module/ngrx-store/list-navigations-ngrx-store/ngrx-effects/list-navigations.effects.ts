/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: list-navigations.effects.ts
 * Last modified | Ostatnia modyfikacja: 10/05/2022, 00:32
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

import { map, mergeMap } from 'rxjs';

import * as NgrxAction_NAV from '../list-navigations.actions';

import { BasicDataSortBy } from '../../../types/basic-data-sort-by.types';
import { AvailablesSortingTypes } from '../../../types/availables-sorting.types';

import { HelpersConnectorService } from '../../../services/helpers-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiedzialnych za parametry nawigacji list systemu zarządzania treścią.
 */

@Injectable()
export class ListNavigationsEffects {

    public constructor(
        private _action$: Actions,
        private _service: HelpersConnectorService,
    ) {
    }

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt odpowiadający za łączenie się z serwisem, pobierający podstawowe elementy paginacji i zwracający
     * wynik po czym ustawia ten wynik w ngrx storze.
     */
    public insertBasicNavigationData$ = createEffect(() => {
        return this._action$.pipe(
            ofType(NgrxAction_NAV.__insertBaseListNavigations),
            mergeMap(() => {
                return this._service
                    .getAvailablePaginations()
                    .pipe(
                        map(data => {
                            return NgrxAction_NAV.__successInsertBaseListNavigations({ basicData: {
                                pageNumber: 1,
                                searchPhrase: '',
                                allPageSizes: data.availablePaginations,
                                sortBy: BasicDataSortBy.ID,
                                pageSize: data.availablePaginations[0],
                                sortDirection: AvailablesSortingTypes.ASC,
                            }});
                        }),
                     )},
            ),
        );
    });
}