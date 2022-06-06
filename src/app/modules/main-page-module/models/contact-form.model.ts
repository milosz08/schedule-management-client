/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: contact-form.model.ts
 * Last modified | Ostatnia modyfikacja: 06/06/2022, 01:25
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

export class ContactFormModel {
    public issueType: string;
    public departmentName: string;
    public ifAnonymous: boolean;
    public groups: Array<number>;
    public description: string;

    public constructor(
        issueType: string, departmentName: string, ifAnonymous: boolean, groups: Array<number>, description: string
    ) {
        this.issueType = issueType;
        this.departmentName = departmentName;
        this.ifAnonymous = ifAnonymous;
        this.groups = groups;
        this.description = description;
    };
}

//----------------------------------------------------------------------------------------------------------------------

export class ExtendedContactFormModel extends ContactFormModel {
    public name: string;
    public surname: string;
    public email: string;
    public userHash: string;

    public constructor(name: string, surname: string, email: string, userHash: string, base: ContactFormModel) {
        super(base.issueType, base.departmentName, true, base.groups, base.description);
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.userHash = userHash;
    };
}