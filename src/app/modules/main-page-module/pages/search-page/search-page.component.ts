/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: search-page.component.ts
 * Last modified | Ostatnia modyfikacja: 09/04/2022, 17:11
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
import { Meta, Title } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';
import { debounceTime, delay, distinctUntilChanged, mergeMap, Subject } from 'rxjs';

import { AllMainWebpages, MetaWebContentHelper } from '../../../../utils/meta-web-content.helper';

import { SearchQueryResModel } from '../../models/search-query.model';
import { GetConnectorService } from '../../services/get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Widok odpowiadający za generowanie strony umożliwiającej wyszukanie nauczyciela/grupy/planu.
 */

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: [ './search-page.component.scss' ],
    providers: [ GetConnectorService ],
})
export class SearchPageComponent extends MetaWebContentHelper implements OnDestroy {

    public _searchParamsForm: FormGroup;

    public _allFoundElements: Array<SearchQueryResModel> = new Array<SearchQueryResModel>();
    public _loadingElements: boolean = false;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        titleService: Title,
        metaService: Meta,
        private _serviceGET: GetConnectorService,
    ) {
        super(titleService, metaService, AllMainWebpages.SEARCH);
        this._searchParamsForm = new FormGroup({
            searchQuery: new FormControl(''),
            ifGroupsActive: new FormControl(true),
            ifTeachersActive: new FormControl(true),
            ifRoomsActive: new FormControl(true),
        });
        this._searchParamsForm.valueChanges.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            takeUntil(this._unsubscribe),
            mergeMap(query => {
                this._loadingElements = true;
                return this._serviceGET.getAllElementsBaseSearchQueryPage(query);
            }),
            delay(1000),
        ).subscribe(foundElements => {
            this._loadingElements = false;
            this._allFoundElements = foundElements;
        });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleCheckedCheckboxParamsQuery(ifChecked: boolean, controlName: string): void {
        this._searchParamsForm.get(controlName)?.patchValue(!ifChecked);
    };
}