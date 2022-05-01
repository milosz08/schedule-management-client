/*
 * Copyright (c) 2022 by MILOSZ GILGA <https://miloszgilga.pl> <https://github.com/Milosz08>
 * Silesian University of Technology | Politechnika Śląska
 *
 * File name | Nazwa pliku: image-manipulation.service.ts
 * Last modified | Ostatnia modyfikacja: 01/05/2022, 18:30
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

/**
 * Serwis odpowiedzialny za manipulację plikami typu image.
 */

@Injectable({
    providedIn: 'root',
})
export class ImageManipulationService {

    /**
     * Metoda konwertująca ciąg bajtów obrazu (zapisany w postaci wartości string) na odnośnik URI. Używane głównie
     * do przechowywania odnośników obrazów w ngrx store.
     */
    public convertSingleImageFromBytesToUri(imageUri: string): string {
        const parts = imageUri.split(';base64,');
        const decodedData = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(decodedData.length);
        for (let i = 0; i < decodedData.length; i++) {
            uInt8Array[i] = decodedData.charCodeAt(i);
        }
        imageUri = window.URL.createObjectURL(new Blob([uInt8Array], { type: parts[0].split(':')[1] }));
        return imageUri;
    };

    //------------------------------------------------------------------------------------------------------------------

    /**
     * Metoda zmieniająca wielkość obrazka (kompresja przed zapisaniem do local storage itp.).
     */
    public changeImageDimensions(image: HTMLImageElement, imageSize: number): string {
        const canvas = document.createElement('canvas');
        canvas.width = imageSize;
        canvas.height = imageSize;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(image, 0, 0, imageSize, imageSize);
        return canvas.toDataURL('image/jpeg');
    };
}