/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { snackbarFadeAndMove } from '~/shared-module/animations/snackbar-fade-and-move.animation';
import { SnackbarService } from '~/shared-module/service/snackbar/snackbar.service';
import { SnackbarSeverity } from '~/shared-module/types/snackbar.type';

@Component({
  selector: 'app-snackbars-container',
  templateUrl: './snackbars-container.component.html',
  styleUrl: './snackbars-container.component.scss',
  animations: [snackbarFadeAndMove],
})
export class SnackbarsContainerComponent {
  snackbars$ = this._snackbarService.snackbars$;

  constructor(private readonly _snackbarService: SnackbarService) {}

  getIconUrl(severity: SnackbarSeverity): string {
    let iconStartUrl = 'assets/icon/info';
    if (severity === 'error') {
      iconStartUrl += '-important';
    }
    return `${iconStartUrl}-icon.svg`;
  }
}
