/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: add-edit-schedule-activity-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 25/05/2022, 18:08
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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import * as NgrxAction_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.actions';
import * as NgrxSelector_SMA from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { ScheduleManipulatorReducerType } from '../../ngrx-store/schedule-manipulator-ngrx-store/schedule-manipulator.selectors';
import { CmsScheduleActivityFormModel } from '../../ngrx-store/schedule-manipulator-ngrx-store/ngrx-models/cms-schedule-activity-req.model';

import { CmsGetAllConnectorService } from '../../services/cms-get-all-connector.service';
import { CmsGetQueryConnectorService } from '../../services/cms-get-query-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiedzialny za renderowanie widoku modala umożliwiającego dodawanie nowej aktywności do planu zajęć
 * wybranej grupy dziekańskiej.
 */

@Component({
    selector: 'app-add-edit-schedule-activity-modal',
    templateUrl: './add-edit-schedule-activity-modal.component.html',
    styleUrls: [ './add-edit-schedule-activity-modal.component.scss' ],
    animations: [ fadeInOutAnimation ],
    providers: [ CmsGetAllConnectorService, CmsGetQueryConnectorService ],
})
export class AddEditScheduleActivityModalComponent implements OnInit, OnDestroy {

    public _modalVisibility$: Observable<boolean> = this._store.select(NgrxSelector_SMA.sel_modalAddEditVisibilityState);
    public _ifDataAdding$: Observable<boolean> = this._store.select(NgrxSelector_SMA.sel_isDataAdding);
    public _selDay$: Observable<string> = this._store.select(NgrxSelector_SMA.sel_selectedDayToEdit);

    public _addNewContentForm: FormGroup;
    private _ifAddForAllGroups: boolean = false;
    public _serverError: string = '';

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _serviceGET: CmsGetQueryConnectorService,
        private _serviceAllGET: CmsGetAllConnectorService,
        private _store: Store<ScheduleManipulatorReducerType>,
    ) {
        this._addNewContentForm = new FormGroup({
            subjectOrActivityName: new FormControl('', [ Validators.required ]),
            subjectTypeName: new FormControl('', [ Validators.required ]),
            subjectRooms: new FormControl([]),
            subjectTeachers: new FormControl([]),
            hourStart: new FormControl('', [ Validators.required ]),
            hourEnd: new FormControl('', [ Validators.required ]),
            studyYear: new FormControl('', [ Validators.required ]),
            weeksData: new FormControl([]),
        });
        this._addNewContentForm.valueChanges.pipe(takeUntil(this._unsubscribe)).subscribe(data => {
            if (this._serverError !== '' && data.subjectOrActivityName) {
                this._store.dispatch(NgrxAction_SMA.__clearServerErrorMessage());
            }
        });

    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnInit(): void {
        this._store
            .pipe(takeUntil(this._unsubscribe), select(NgrxSelector_SMA.sel_ifAddingError))
            .subscribe(errorMessage => this._serverError = errorMessage);
    };

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleToggleAddingForMultipleGroups(ifAddedForAllGroups: boolean): void {
        this._ifAddForAllGroups = ifAddedForAllGroups;
    };

    public handleSubmitNewScheduleActivity(): void {
        this._store.dispatch(NgrxAction_SMA.__setAddingNewContentState({ ifAdding: true }));
        const formData =  this._addNewContentForm.getRawValue();
        const addedFlag: CmsScheduleActivityFormModel = { ...formData, ifAddForAllGroups: this._ifAddForAllGroups };
        this._store.dispatch(NgrxAction_SMA.__addNewScheduleActivity({ activityData: addedFlag }));
        this._addNewContentForm.reset({ subjectRooms: [], subjectTeachers: [], weeksData: [] });
    };

    public handleCloseModal(): void {
        this._store.dispatch(NgrxAction_SMA.__setModalClose());
        this._addNewContentForm.reset({ subjectRooms: [], subjectTeachers: [], weeksData: [] });
    };
}