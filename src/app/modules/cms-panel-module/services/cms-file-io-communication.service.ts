/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: cms-file-io-communication.service.ts
 * Last modified | Ostatnia modyfikacja: 11/05/2022, 23:04
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

import { CmsRegisterResDataModel } from '../ngrx-store/post-data-ngrx-store/ngrx-models/cms-register-req-res-data.model';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Serwis odpowiedzialny za tworzenie i komunikację I/O plików tekstowych w przeglądarce dla panelu
 * administratora.
 */

@Injectable()
export class CmsFileIoCommunicationService {

    /**
     * Zapis danych strzonego użytkownika do pliku tekstowego.
     */
    public saveDataIntoFile(data: CmsRegisterResDataModel): void {
        const element = document.createElement('a');
        const file = new Blob([ CmsFileIoCommunicationService.generateFileContent(data) ], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${CmsFileIoCommunicationService.fileNameParsingData(data.name, data.surname)}`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Tworzenie i zwracanie nazwy pliku do pobrania.
     */
    private static fileNameParsingData(name: string, surname: string): string {
        const date = new Date();
        return `user_${name.toLowerCase()}-${surname.toLowerCase()}__${date.toISOString().split('T')[0]}.txt`
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Generowanie wewnętrznej treści pliku.
     */
    private static generateFileContent(data: CmsRegisterResDataModel): string {
        return (
            'Imię i nazwisko:           ' + data.name + ' ' + data.surname + '\n' +
            'Miejscowość zamieszkania:  ' + data.city + '\n' +
            'Narodowość:                ' + data.nationality + '\n' +
            'Rola w systemie:           ' + data.role + '\n' +
            'Adres email:               ' + data.email + '\n' +
            'Hasło do adresu email:     ' + data.emailPassword + '\n'
        );
    };
}