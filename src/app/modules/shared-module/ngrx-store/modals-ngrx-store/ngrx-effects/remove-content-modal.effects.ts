                 /*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: remove-content-modal.effects.ts
 * Last modified | Ostatnia modyfikacja: 13/05/2022, 17:02
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
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { catchError, delay, map, mergeMap, Observable, of, withLatestFrom } from 'rxjs';

import * as NgrxAction_MOD from '../modals.actions';
import { MODALS_REDUCER, ModalsReducerType } from '../modals.selectors';

import { UserCredentialsType } from '../../../../../types/user-credentials.type';
import { CmsDeleteConnectorService } from '../../../../cms-panel-module/services/cms-delete-connector.service';

//----------------------------------------------------------------------------------------------------------------------

/**
 * Klasa efektów odpowiadających za middleware do uruchomienia modala ostrzegającego przed usunięciem wybranych
 * treści z serwera.
 */

@Injectable()
export class RemoveContentModalEffects {

    public constructor(
        private _actions$: Actions,
        private _store: Store<ModalsReducerType>,
        private _serviceDELETE: CmsDeleteConnectorService,
        ) {
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt obsługujący usuwanie wybranych treści z serwera (obsłużony dla jednej treści, wszystkich treści
     * oraz wybrannych treści - na podstawie ciała zapytania DELETE).
     */
    public removeElementsAndCloseModal$ = createEffect(() => {
        return this._actions$.pipe(
            ofType(NgrxAction_MOD.__removeContentModal),
            delay(2000), // opóźnienie w celu zniwelowania efektu stroboskopowego
            withLatestFrom(this._store.select(MODALS_REDUCER)),
            mergeMap(([ action, state ]) => {
                const { deleteContentModal } = state;
                const { removeContentPath, removeContentIds } = deleteContentModal;
                if (removeContentPath !== '') {
                    if (removeContentIds.length === 0) {
                        return this.removeElementsHTTPDeleteInvoker(removeContentPath, action.credentials);
                    }
                    return this._serviceDELETE
                        .massiveDeleteEntities(removeContentIds, removeContentPath, action.credentials)
                        .pipe(
                            map(() => {
                                this.suspenseForceDelayInvoker();
                                return NgrxAction_MOD.__successRemoveContentModal();
                            }),
                            catchError(({ error }) => {
                                return this.handlingServerExceptions(error ? error.message : false);
                            }),
                        );
                }
                return of(NgrxAction_MOD.__failureRemoveContentModal({}));
            }),
        );
    });

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Efekt pomocniczy komunikujący się z serwerem poprzez serwis HTTP i metodę DELETE usuwającą wybrane zasoby
     * z serwera. Używany dla wszystkich elementów i jednego konkretnego elementu.
     */
    private removeElementsHTTPDeleteInvoker(endpoint: string, credentials: UserCredentialsType): Observable<any> {
        return this._serviceDELETE
            .deleteEntity(endpoint, credentials)
            .pipe(
                map(() => {
                    this.suspenseForceDelayInvoker();
                    return NgrxAction_MOD.__successRemoveContentModal();
                }),
                catchError(({ error }) => {
                    return this.handlingServerExceptions(error ? error.message : false);
                }),
            );
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Invoker wyłączający logo ładowania elementów (suspense).
     */
    private suspenseForceDelayInvoker(): void {
        this._store.dispatch(NgrxAction_MOD.__setSuspenseRemovingContentModal({ visibility: false }));
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda obsługująca wyłapywanie wyjątków rzucanych przez serwer. Jeśli wyjątek nie jest sprecyzowany (np.
     * brak połączenia z serwerem wysyła ogólny komunikat)
     */
    private handlingServerExceptions(errorMessage: string): Observable<any> {
        this.suspenseForceDelayInvoker();
        if (!errorMessage) {
            return of(NgrxAction_MOD.__failureRemoveContentModal({
                errorMessage: 'Brak połączenia z serwerem. Spróbuj ponownie później.'
            }));
        }
        return of(NgrxAction_MOD.__failureRemoveContentModal({ errorMessage }));
    };
}