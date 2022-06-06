/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: fade-animations.ts
 * Last modified | Ostatnia modyfikacja: 24/04/2022, 20:02
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

import { animate, style, transition, trigger } from '@angular/animations';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Plik zawierający deklaracje prostych animacji (fadeIn, fadeOut itp.).
 */

export const fadeOutAnimation = trigger('fadeOutAnimation', [
    transition(
        ':leave',
        [
            style({ opacity: 1 }),
            animate('.5s ease-out', style({ opacity: 0 })),
        ],
    ),
]);

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
    transition(
        ':enter',
        [
            style({ opacity: 0 }),
            animate('.2s ease-out', style({ opacity: 1 })),
        ],
    ),
    transition(
        ':leave',
        [
            style({ opacity: 1 }),
            animate('.2s ease-out', style({ opacity: 0 })),
        ],
    ),
]);