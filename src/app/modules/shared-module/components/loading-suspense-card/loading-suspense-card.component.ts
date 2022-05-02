/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: loading-suspense-card.component.ts
 * Last modified | Ostatnia modyfikacja: 22/04/2022, 17:09
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

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { fadeOutAnimation } from '../../../../animations/fade-animations';

import { SuspenseService } from '../../services/suspense.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent renderujący widok planszy ładowania kontentu (leniwe ładowanie treści, pobieranie
 * danych z serwera itp.).
 */

@Component({
    selector: 'app-loading-suspense-card',
    templateUrl: './loading-suspense-card.component.html',
    styleUrls: [ './loading-suspense-card.component.scss' ],
    animations: [ fadeOutAnimation ],
})
export class LoadingSuspenseCardComponent {

    public _suspenseLoading$: Observable<boolean> = this._store.select(getSuspenseLoading);

    constructor(
        private _store: Store<InitialSharedStateTypes>,
        private _service: SuspenseService,
    ) {
        this._service.toggleSuspenseComponent();
    };
}