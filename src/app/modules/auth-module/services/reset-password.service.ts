/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: reset-password.service.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 16:31
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

import { ResponseResetPasswordTokenModel } from '../../../models/response-reset-password-token.model';
import { ResponseServerMessageModel } from '../../../models/response-server-message.model';
import { RequestResetPasswordModel } from '../../../models/request-reset-password.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiadający za obsługę żądań HTTP odpowiadających za procedurę resetowania hasła poprze usługę
 * adresu email użytkownika.
 */

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {

    public constructor(
        private _http: HttpClient,
        private _endpoints: ApiConfigurerHelper,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda wysyłająca zapytanie do serwera typu POST, który realizuje wysłanie adresu email z tokenem
     * umożliwiającym zresetowanie hasła.
     */
    public userSendResetPasswordTokenViaEmail(email: string): Observable<ResponseServerMessageModel> {
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.RESET_PASSWORD_SEND_TOKEN_VIA_EMAIL,
            null, { params: { userEmail: email } }
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda wysyłająca żądanie do serwera typu POST, która na podstawie tokenu zwraca error lub specjalnie
     * spreparowanyJWT (z krótkim okresem przydatności), umożliwiający zresetowanie hasła.
     */
    public userResetPasswordValidateToken(token: string): Observable<ResponseResetPasswordTokenModel> {
        return this._http.post<ResponseResetPasswordTokenModel>(
            this._endpoints.RESET_PASSWORD_VALIDATE_TOKEN,
            null, { params: { emailToken: token } }
        );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda wysyłająca żądanie do serwera typu POST validujące i zmieniające hasło użytkownika.
     */
    public userResetPasswordViaEmailToken(data: RequestResetPasswordModel): Observable<ResponseServerMessageModel> {
        const { newPassword, newPasswordConfirmed, bearerToken } = data;
        return this._http.post<ResponseServerMessageModel>(
            this._endpoints.RESET_PASSWORD_VIA_TOKEN,
            { newPassword, newPasswordConfirmed },
            { headers: { Authorization: `Bearer ${bearerToken}` } },
        );
    };
}