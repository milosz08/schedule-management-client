/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: auth.service.ts
 * Last modified | Ostatnia modyfikacja: 25/04/2022, 01:01
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

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppGlobalState } from '../ngrx-store/combine-reducers';
import { BrowserStorageService } from './browser-storage.service';
import { RefreshTokenResposneModel } from '../ngrx-store/session-ngrx-store/ngrx-models/refresh-token.model';
import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';

import { ApiConfigurerHelper } from '../utils/api-configurer.helper';

/**
 * Serwis odpowiadający za łączenie się z api w celu autoryzacji użytkownika.
 */

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _http: HttpClient,
        private _store: Store<AppGlobalState>,
        private _storageService: BrowserStorageService,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    /**
     * Żądanie HTTP POST do API w celu uzyskania uwierzytelnienia.
     */
    public userLogin(login: string, password: string): Observable<AuthResponseDataModel> {
        return this._http.post<AuthResponseDataModel>(
            this._endpoints.LOGIN_USER,
            { login, password }
        );
    };

    /**
     * Żądanie HTTP POST do API w celu uzyskania nowego token JWT na podstawie tokenu odświeżającego.
     */
    public getNewJwtToken(befToken: string, refreshToken: string): Observable<RefreshTokenResposneModel> {
        return this._http.post<RefreshTokenResposneModel>(
            this._endpoints.GET_REFRESH_TOKEN,
            { bearerToken: befToken, refreshBearerToken: refreshToken }
        );
    };

    /**
     * Żądanie HTTP GET do API w celu pozyskania avataru (żądanie chronione przez JWT).
     */
    public userGetImage(userId: string, jwt: string): Observable<Blob> {
        return this._http.get(
            this._endpoints.GET_USER_IMAGE,
            { responseType: 'blob', headers: { Authorization: `Bearer ${jwt}` }, params: { userId } }
        );
    };
}