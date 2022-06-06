/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: contact-as-anonymous.component.ts
 * Last modified | Ostatnia modyfikacja: 05/06/2022, 23:41
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

import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { catchError, delay, of, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MiscHelper } from '../../../../utils/misc.helper';
import { ExtendedContactFormModel } from '../../models/contact-form.model';

import { ContactConnectorService } from '../../services/contact-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku umożliwiającego wysłanie nowej anonimowej wiadomości.
 */

@Component({
    selector: 'app-contact-as-anonymous',
    templateUrl: './contact-as-anonymous.component.html',
    styleUrls: [],
    providers: [ ContactConnectorService ],
})
export class ContactAsAnonymousComponent implements OnDestroy {

    public readonly _checkError = (name: string) => MiscHelper.checkNgFormError(this._anonymousContactForm, name);

    public _anonymousContactForm: FormGroup;

    public _ifServerError: boolean = false;
    public _isSeding: boolean = false;
    public _serverMessage: string = '';

    private _unsubscribe: Subject<void> = new Subject();
    private _ifClearField: boolean = true;

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _service: ContactConnectorService,
    ) {
        this._anonymousContactForm = new FormGroup({
            name: new FormControl('', [ Validators.required ]),
            surname: new FormControl('', [ Validators.required ]),
            email: new FormControl('', [ Validators.required, Validators.email ]),
            issueType: new FormControl('', [ Validators.required ]),
            departmentName: new FormControl(''),
            groups: new FormControl([]),
            description: new FormControl('', [ Validators.required, Validators.minLength(10) ]),
        });
        this._anonymousContactForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(() => {
            if (this._serverMessage !== '' && this._ifClearField) {
                this._serverMessage = '';
                this._ifServerError = false;
            }
            this._ifClearField = true;
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleSubmitNewAnonymousContact(): void {
        const formData: ExtendedContactFormModel = this._anonymousContactForm.getRawValue();
        formData.ifAnonymous = true;
        this._service.sendContactFormData(formData).pipe(
            delay(500),
            take(1),
            takeUntil(this._unsubscribe),
            catchError(({ error }) => {
                this._ifServerError = true;
                this._serverMessage = error ? error.message : 'Nastąpił problem z dodaniem zgłoszenia. Spróbuj ponownie.';
                this._isSeding = false;
                return of();
            }),
        ).subscribe(res => {
            this._serverMessage = res.message;
            this._isSeding = false;
            this._ifClearField = false;
            this._anonymousContactForm.reset({ groups: [] });
        });
    };
}