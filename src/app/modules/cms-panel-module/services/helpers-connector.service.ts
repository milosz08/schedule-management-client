/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: helpers-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 09/05/2022, 21:10
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
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa serwisu pomocniczego do łączenia z backendem dla tabel w systemie zarządzania treścią.
 */

@Injectable({
    providedIn: 'root'
})
export class HelpersConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda zaciągająca z API dostępne opcje ilości elementów na jednej stronie (paginacja).
     */
    public getAvailablePaginations(): Observable<{ availablePaginations: Array<number> }> {
        return this._http.get<{ availablePaginations: Array<number> }>(
            this._endpoints.AVAILABLE_PAGINATIONS,
        ).pipe(
            map(data => {
                return data;
            }),
        );
    };

}