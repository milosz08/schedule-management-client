/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: main-header.component.ts
 * Last modified | Ostatnia modyfikacja: 17/04/2022, 13:17
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

import { Component, HostListener } from '@angular/core';

import MainPageNavigationMockedData from '../../../../mocked-data/main-page-navigation-content.json';

import { MainNavigationModel } from '../../models/main-navigation.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku głównego headera na stronach niechronionych
 * (dostępnych z poziomu wszystkich, przede wszystkim użytkowników niezalogowanych).
 */

@Component({
    selector: 'app-main-header',
    templateUrl: './main-header.component.html',
    styleUrls: [ './main-header.component.scss' ],
})
export class MainHeaderComponent {

    public readonly _navigationData: MainNavigationModel[];
    public _ifHamburgerOpen: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public constructor() {
        this._navigationData = MainPageNavigationMockedData;
    };

    //------------------------------------------------------------------------------------------------------------------

    public handleHamburgerToggle(): void {
        this._ifHamburgerOpen = !this._ifHamburgerOpen;
    };

    @HostListener('window:resize', ['$event'])
    public onResize(_: Event) {
        if (window.innerWidth > 1090 && this._ifHamburgerOpen) {
            this._ifHamburgerOpen = false;
        }
    };

    public handleCloseHambuerMenu(): void {
        this._ifHamburgerOpen = false;
    };

    get __hamburgerActiveClass(): string {
        return this._ifHamburgerOpen ? 'app__header__hamburger-bars hamburger--active' : 'app__header__hamburger-bars';
    };
}