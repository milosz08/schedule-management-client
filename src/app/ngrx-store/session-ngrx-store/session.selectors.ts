/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.selectors.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 19:43
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

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InitialSessionStateTypes } from './session.initial';
import { UserIdentityModel } from './ngrx-models/user-identity.model';

/**
 * Plik przechowujący wszystkie selektory dla ngrx stora przechowującego informacje o stanie sesji użytkownika.
 */

export const SESSION_REDUCER = 'sessionReducer' as const;
const getSessionState = createFeatureSelector<InitialSessionStateTypes>(SESSION_REDUCER);


export const getUserDetailsPopupButtonTitle = createSelector(getSessionState, state => (
    Boolean(state.userData) ? 'Otwórz panel użytkownika' : 'Przejdź do logowania'
));

export const getUserInitials = createSelector(getSessionState, state => {
    if (state.userData) {
        const [ name, surname ] = state.userData.nameWithSurname.split(' ');
        return name.charAt(0) + surname.charAt(0);
    }
    return '';
});

export const getUserAuthLevel = createSelector(getSessionState, state => {
    switch(state.userData?.role) {
        case 'ADMINISTRATOR':
            return 'administrator';
        case 'EDITOR':
            return 'edytor';
        case 'TEACHER':
            return 'nauczyciel';
        default:
            return 'student';
    }
});

export const getUserData = createSelector(
    getSessionState,
    state => state.userData
);

export const getUserHeaderName = createSelector(
    getSessionState,
    state => state.userData?.nameWithSurname || 'Zaloguj');

export const getUserLogin = createSelector(
    getSessionState,
    state => state.userData?.login || '');

export const getIfUserNotLogged = createSelector(
    getSessionState,
    state => !Boolean(state.userData)
);

export const getIfUserHasImage = createSelector(
    getSessionState,
    state => Boolean(state.userData?.hasPicture)
);

export const getUserImageURL = createSelector(
    getSessionState,
    state => state.userImage);

export const getLoginError = createSelector(
    getSessionState,
    state => state.errorMessage
);

export const getUserIdentity = createSelector(
    getSessionState,
    state => state.userData ? state.userData.role : UserIdentityModel.UNDEFINED,
)