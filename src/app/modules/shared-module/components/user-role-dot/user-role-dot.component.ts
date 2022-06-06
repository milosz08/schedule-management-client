/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: user-role-dot.component.ts
 * Last modified | Ostatnia modyfikacja: 06/05/2022, 17:55
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

import { Component, Input } from '@angular/core';

import { MiscHelper } from '../../../../utils/misc.helper';
import { UserIdentityType } from '../../../../types/user-identity.type';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku kółka pokazującego rolę aktualnie zalogowanego użytkownika.
 */

@Component({
    selector: 'app-user-role-dot',
    templateUrl: './user-role-dot.component.html',
    styleUrls: [ './user-role-dot.component.scss' ]
})
export class UserRoleDotComponent {

    @Input() public _userRole: UserIdentityType = UserIdentityType.UNDEFINED;
    @Input() public _ifShowLetter?: boolean = true;
    @Input() public _ifThemeIsDark?: boolean = false;

    //------------------------------------------------------------------------------------------------------------------

    public getUserRoleSingleLetterAndClass(): { letter: string, class: string } {
        return MiscHelper.createUserRoleSingleLetter(this._userRole);
    };

    get __darkThemeClass(): string {
        return 'role-dot ' + (this._ifThemeIsDark ? 'role-dot--dark' : '') + ' '
            + this.getUserRoleSingleLetterAndClass().class;
    };
}