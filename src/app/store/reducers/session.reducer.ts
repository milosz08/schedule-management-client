/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: session.reducer.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 20:04
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

import { SessionActionTypes } from '../types/session.types';
import { initialSessionState, InitialSessionStateTypes } from '../initial-state/session.initial';

export const sessionReducer = (state = initialSessionState, action: any): InitialSessionStateTypes => {
    switch(action.type) {

        case SessionActionTypes.USER_LOGIN: {
            const { ifLogged } = action.payload;
            return { ...state, ifLogged };
        }

        case SessionActionTypes.USER_LOGOUT: {
            const { ifLogged } = action.payload;
            return { ...state, ifLogged };
        }

        default: {
            return state;
        }
    }
};