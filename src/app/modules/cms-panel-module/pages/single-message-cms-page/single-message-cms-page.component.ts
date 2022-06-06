/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: single-message-cms-page.component.ts
 * Last modified | Ostatnia modyfikacja: 06/06/2022, 08:39
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { catchError, delay, of, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserMessageBaseIdModel } from '../../models/cms-single-base-id-data.model';

import { CmsGetSingleBaseIdConnectorService } from '../../services/cms-get-single-base-id-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku strony wyświetlającej szczegółowe informacje na temat wybranej
 * widaomości użytkownika. W przypadku błędu serwera, komponent wyświetli zwrócony komunikat.
 */

@Component({
    selector: 'app-single-message-cms-page',
    templateUrl: './single-message-cms-page.component.html',
    styleUrls: [],
    providers: [ CmsGetSingleBaseIdConnectorService ],
    host: { class: 'app__main-flex-columned' },
})
export class SingleMessageCmsPageComponent implements OnInit, OnDestroy {

    public _currentRoute: string = '';
    public _ifLoading: boolean = true;
    public _serverError: string = '';
    public _messageId: number;

    public _messageData!: UserMessageBaseIdModel;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _route: ActivatedRoute,
        private _serviceGET: CmsGetSingleBaseIdConnectorService,
    ) {
        this._messageId = Number(this._route.snapshot.paramMap.get('messageId'));
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._route.data.pipe(
            takeUntil(this._unsubscribe)
        ).subscribe(data => this._currentRoute = data.returnRoutePath);
        this._serviceGET.getUserMessageDetailsBaseDbId(this._messageId).pipe(
            take(1),
            delay(500),
            takeUntil(this._unsubscribe),
            catchError(({ error }) => {
                this._ifLoading = false;
                if (error) {
                    this._serverError = error.message;
                } else {
                    this._serverError = 'Nastąpił problem z pobraniem zasobu. Spróbuj ponownie.';
                }
                return of();
            }),
        ).subscribe(data => {
            this._ifLoading = false;
            this._messageData = data;
        });
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };
}