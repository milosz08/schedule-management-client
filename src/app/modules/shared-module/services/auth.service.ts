/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: auth.service.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 18:11
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

import { Observable } from 'rxjs';
import { ApiConfigurerHelper } from '../../../utils/api-configurer.helper';

import { AuthResponseDataModel } from '../../../models/auth-response-data.model';
import { RefreshTokenResponseModel } from '../../../models/refresh-token.model';
import { ResponseServerMessageModel } from '../../../models/response-server-message.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiadający za łączenie się z api w celu autoryzacji użytkownika.
 */

@Injectable()
export class AuthService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Żądanie HTTP POST do API w celu uzyskania uwierzytelnienia.
     */
    public userLogin(login: string, password: string): Observable<AuthResponseDataModel> {
        return this._http.post<AuthResponseDataModel>(
            this._endpoints.LOGIN_USER,
            { login, password }
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Żądanie HTTP POST do API w celu uzyskania nowego token JWT na podstawie tokenu odświeżającego.
     */
    public getNewJwtToken(befToken: string, refreshToken: string): Observable<RefreshTokenResponseModel> {
        return this._http.post<RefreshTokenResponseModel>(
            this._endpoints.GET_REFRESH_TOKEN,
            { bearerToken: befToken, refreshBearerToken: refreshToken }
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Żądanie HTTP GET do API w celu pozyskania avataru (żądanie chronione przez JWT).
     */
    public userGetImage(userId: string, jwt: string): Observable<Blob> {
        return this._http.get(
            this._endpoints.GET_USER_IMAGE,
            { responseType: 'blob', headers: { Authorization: `Bearer ${jwt}` }, params: { userId } }
        );
    };


    //------------------------------------------------------------------------------------------------------------------

    /**
     * Dodanie zdjęcia/zmiana zdjęcia przez użytkownika.
     */
    public addChangeUserImage(image: File): Observable<ResponseServerMessageModel> {
        const payload = new FormData();
        payload.append('image', image, image.name);
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.ADD_CHANGE_USER_IMAGE,
            payload,
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usunięcie zdjęcia przez użytkownika.
     */
    public deleteUserImage(): Observable<ResponseServerMessageModel> {
        return this._http.delete<ResponseServerMessageModel>(
            this._endpoints.DELETE_USER_IMAGE,
        );
    };
}