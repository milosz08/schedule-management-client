/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.selectors.ts
 * Last modified | Ostatnia modyfikacja: 02/05/2022, 17:42
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
import { UserIdentityType } from '../../../../types/user-identity.type';

//----------------------------------------------------------------------------------------------------------------------

export const SESSION_REDUCER = 'sessionReducer' as const;
const getSessionState = createFeatureSelector<InitialSessionStateTypes>(SESSION_REDUCER);

export type SessionReducerType = { [SESSION_REDUCER]: InitialSessionStateTypes };

const selectorWithInjectedStore = (payload: (state: any, action?: any) => any) => (
    createSelector(getSessionState, payload)
);

//----------------------------------------------------------------------------------------------------------------------

export const sel_userDetailsPopupButtonTitle = createSelector(getSessionState, state => (
    Boolean(state.userData) ? 'Otwórz panel użytkownika' : 'Przejdź do logowania'
));

export const sel_userInitials = selectorWithInjectedStore(state => {
    if (state.userData) {
        const [ name, surname ] = state.userData.nameWithSurname.split(' ');
        return name.charAt(0) + surname.charAt(0);
    }
    return '';
});

export const sel_userAuthLevel = selectorWithInjectedStore(state => {
    return state.userData?.role;
});

export const sel_userHeaderName = selectorWithInjectedStore(
    state => state.userData?.nameWithSurname || 'Zaloguj'
);

export const sel_userLogin = selectorWithInjectedStore(
    state => state.userData?.login || ''
);

export const sel_userRole = selectorWithInjectedStore(
    state => state.userData?.role || UserIdentityType.UNDEFINED,
);

export const sel_ifUserNotLogged = selectorWithInjectedStore(
    state => !Boolean(state.userData)
);

export const sel_ifUserHasImage = selectorWithInjectedStore(
    state => Boolean(state.userData?.hasPicture)
);

export const sel_userImageURL = selectorWithInjectedStore(
    state => state.userImage);

export const sel_loginError = selectorWithInjectedStore(
    state => state.errorMessage
);

export const sel_userIdentity = selectorWithInjectedStore(
    state => state.userData ? state.userData.role : UserIdentityType.UNDEFINED,
);

export const sel_tokenRefreshInSeconds = selectorWithInjectedStore(
    state => state.userData ? !state.sessionEndModalVisibility ? state.userData.tokenRefreshInSeconds : 0 : false,
);

export const sel_userSessionCurrentTime = selectorWithInjectedStore(
    state => state.sessionLeftTime * 1000,
);

export const sel_sessionSoonLogout = selectorWithInjectedStore(
    state => state.sessionLeftTime < 15,
);

export const sel_userConnectedDepartment = selectorWithInjectedStore(
    state => state.userData?.connectedWithDepartment || '',
);

export const sel_updateUserImageServerMess = selectorWithInjectedStore(
    state => state.updateImageServerRes,
);

export const sel_ifUpdateUserImageServerError = selectorWithInjectedStore(
    state => state.ifUpdateImageServerError,
);