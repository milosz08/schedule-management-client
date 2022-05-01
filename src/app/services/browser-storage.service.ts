/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: browser-storage.service.ts
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

import { AuthResponseDataModel } from '../ngrx-store/session-ngrx-store/ngrx-models/auth-response-data.model';
import { RefreshTokenResposneModel } from '../ngrx-store/session-ngrx-store/ngrx-models/refresh-token.model';
import { ImageManipulationService } from './image-manipulation.service';

/**
 * Serwis odpowiadający za komunikację aplikacji z mechanizmem session/local storage.
 */

@Injectable({
    providedIn: 'root'
})
export class BrowserStorageService {

    public static readonly USER_DATA_KEY: string = "user__autologin" as const;
    public static readonly USER_IMAGE_KEY: string = "user__image" as const;

    public constructor(
        private _imageManipulationService: ImageManipulationService,
    ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pozyskanie obiektu użytkownika z local storage (jeśli obiekt nie istnieje, zwraca null).
     */
    public getUserFromStorage(): AuthResponseDataModel | null {
        const userDataBeforeParse = localStorage.getItem(BrowserStorageService.USER_DATA_KEY);
        if (userDataBeforeParse) {
            return JSON.parse(userDataBeforeParse);
        }
        return null;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapis obiektu reprezentującego użytkownika do local storage. Dodatkowo konwertuje ciąg znaków
     * na postać obiektu Date reprezentującego wygaśnięcie JWT.
     */
    public setUserInStorage(user: AuthResponseDataModel): void {
        user.tokenExpirationDate = new Date(user.tokenExpirationDate);
        localStorage.setItem(BrowserStorageService.USER_DATA_KEY, JSON.stringify(user));
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Usuwanie użytkownika z magazynu local storage (oraz jego zdjęcia, jeśli było zapisane).
     */
    public removeUserWithImageFromStorage(): void {
        localStorage.removeItem(BrowserStorageService.USER_DATA_KEY);
        localStorage.removeItem(BrowserStorageService.USER_IMAGE_KEY);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Pozyskanie obrazu użytkownika z local storage (jeśli nie znajdzie, zwróć pusty string).
     */
    public getUserImageFromStorage(): string {
        const imageBlob: string | null = localStorage.getItem(BrowserStorageService.USER_IMAGE_KEY);
        if (imageBlob) { // dekodowanie stringa na wartość Blob i stworzenie z niej adresu URL
            return this._imageManipulationService.convertSingleImageFromBytesToUri(imageBlob);
        }
        return '';
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Zapis obrazka (Blob) do local storage i zwrócenie adresu URL do zapisu w ngrx state.
     */
    public setUserImageInStorage(image: Blob): string {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            localStorage.setItem(BrowserStorageService.USER_IMAGE_KEY, reader.result as string);
        });
        reader.readAsDataURL(image);
        return window.URL.createObjectURL(image);
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Odświeżenia stanu użytkownika (JWT, token odświeżający oraz czas życia nowego JWT).
     */
    public setRefreshedJwtTokenInLocalStorage(refreshTokenRes: RefreshTokenResposneModel): void {
        const userDataBeforeParse = localStorage.getItem(BrowserStorageService.USER_DATA_KEY);
        const { bearerToken, refreshBearerToken, tokenExpirationDate } = refreshTokenRes;
        if (userDataBeforeParse) {
            const parseUser: AuthResponseDataModel = JSON.parse(userDataBeforeParse);
            parseUser.bearerToken = bearerToken;
            parseUser.refreshBearerToken = refreshBearerToken;
            parseUser.tokenExpirationDate = tokenExpirationDate;
            this.updateLocalStorageContent(BrowserStorageService.USER_DATA_KEY, parseUser);
        }
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Aktualizowanie magazynu localstorage na podstawie klucza i zmienionego kontentu (value).
     */
    public updateLocalStorageContent(key: string, value: any): void {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    };
}