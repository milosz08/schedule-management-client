/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-delete-connector.service.ts
 * Last modified | Ostatnia modyfikacja: 13/05/2022, 14:16
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
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';
import { UserCredentialsType } from '../../../types/user-credentials.type';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za usuwanie rekordów z bazy danych (w panelu CMS). Posiada dodatkowe przekazywanie parametrów
 * autentykacji w nagłówkach zapytania.
 */

@Injectable({
    providedIn: 'root'
})
export class CmsDeleteConnectorService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie wszystkich zaznaczonych encji z bazy danych (na podstawie tablicy parametrów zapytania HTTP DELETE).
     */
    public massiveDeleteEntities(
        elementsIds: Array<number>, endpoint: string, credentials: UserCredentialsType
    ): Observable<void> {
        return this._http.delete<void>(
            endpoint,
            { body: { elementsIds }, headers: CmsDeleteConnectorService.setCredentialsHttpHeader(credentials) },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie wszystkich elementów w zależności od podanego endpointu
     */
    public deleteEntity(endpoint: string, credentials: UserCredentialsType): Observable<void> {
        return this._http.delete<void>(
            endpoint,
            { headers: CmsDeleteConnectorService.setCredentialsHttpHeader(credentials) },
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Ustawianie nagłówków dla nazwy użytkownika i hasła (autentykacja usuwania zasobów).
     */
    private static setCredentialsHttpHeader({ username, password }: UserCredentialsType): HttpHeaders {
        return new HttpHeaders({
            'User-Name': username,
            'User-Password': password
        });
    };
}
