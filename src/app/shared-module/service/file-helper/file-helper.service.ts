/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileHelperService {
  saveTextToFile(value: string, filename: string): void {
    const blob = new Blob([value], { type: 'text/plain' });

    const anchorElement = document.createElement('a');
    anchorElement.href = URL.createObjectURL(blob);
    anchorElement.download = filename;
    anchorElement.click();

    URL.revokeObjectURL(anchorElement.href);
  }
}
