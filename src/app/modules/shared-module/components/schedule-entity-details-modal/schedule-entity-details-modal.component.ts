/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: schedule-entity-details-modal.component.ts
 * Last modified | Ostatnia modyfikacja: 29/05/2022, 20:56
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
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Observable, Subject, take } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fadeInOutAnimation } from '../../../../animations/fade-animations';

import { UserIdentityType } from '../../../../types/user-identity.type';
import { ApiConfigurerHelper } from '../../../../utils/api-configurer.helper';
import { ScheduleSubjectDetailsRes } from '../../../../types/schedule-data.type';

import * as NgrxAction_MOD from '../../ngrx-store/modals-ngrx-store/modals.actions';
import * as NgrxSelector_MOD from '../../ngrx-store/modals-ngrx-store/modals.selectors';
import { ModalsReducerType } from '../../ngrx-store/modals-ngrx-store/modals.selectors';
import * as NgrxSeletecto_SES from '../../ngrx-store/session-ngrx-store/session.selectors';

import { ScheduleDataGetConnectorService } from '../../../../services/schedule-data-get-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Komponent odpowiadający za renderowanie widoku wybranego planu zajęć (pobranie zasobów z serwera na podstawie
 * parametrów zapytania).
 */

@Component({
    selector: 'app-schedule-entity-details-modal',
    templateUrl: './schedule-entity-details-modal.component.html',
    styleUrls: [ './schedule-entity-details-modal.component.scss' ],
    animations: [ fadeInOutAnimation ],
    providers: [ ScheduleDataGetConnectorService ],
})
export class ScheduleEntityDetailsModalComponent implements OnDestroy {

    public _modalVisibility$: Observable<boolean> = this._store
        .select(NgrxSelector_MOD.sel_scheduleSubjectDetailsModalVisibility);

    public _scheduleDetails!: ScheduleSubjectDetailsRes;
    private _userIdentity: UserIdentityType = UserIdentityType.UNDEFINED;
    private _subjectId: number | null = null;

    private _unsubscribe: Subject<void> = new Subject();

    //------------------------------------------------------------------------------------------------------------------

    public constructor(
        private _router: Router,
        private _endpoints: ApiConfigurerHelper,
        private _store: Store<ModalsReducerType>,
        private _serviceConnectorGET: ScheduleDataGetConnectorService,
    ) {
        this._router.events.pipe(takeUntil(this._unsubscribe), take(1)).subscribe(() => {
            this.handleCloseModal();
        });
        this._store.select(NgrxSeletecto_SES.sel_userIdentity)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(userIdentity => this._userIdentity = userIdentity);
        this._store.select(NgrxSelector_MOD.sel_selectedSubjectId)
            .pipe(takeUntil(this._unsubscribe))
            .subscribe(subjectId => {
                if (subjectId !== null) {
                    this._subjectId = subjectId;
                    this._serviceConnectorGET.getScheduleSubjectDetailsBaseSubjectId(subjectId)
                        .pipe(takeUntil(this._unsubscribe))
                        .subscribe(data => this._scheduleDetails = data);
                }
            });
    };

    //------------------------------------------------------------------------------------------------------------------

    public ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    };

    public handleCloseModal(): void {
        this._store.dispatch(NgrxAction_MOD.__scheduleSubjectDetailsModalVisibility({ modalVisibility: false }));
    };

    get __ifDeleteContentButtonVisible(): boolean {
        return this._router.url.includes('secure') && (this._userIdentity === UserIdentityType.EDITOR ||
            this._userIdentity === UserIdentityType.ADMINISTRATOR);
    };

    public handleDeleteContent(): void {
        this.handleCloseModal();
        if ((this._userIdentity === UserIdentityType.EDITOR || this._userIdentity === UserIdentityType.ADMINISTRATOR)
            && this._subjectId) {
            this._store.dispatch(NgrxAction_MOD.__openRemoveContentModal({
                removeContentPath: this._endpoints.MASSIVE_DELETE_SCHEDULE_SUBJECTS,
                removeContentIds: [ this._subjectId! ] }));
        }
    };
}