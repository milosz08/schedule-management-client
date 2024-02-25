/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const snackbarFadeAndMove = trigger('snackbarFadeAndMove', [
  state('void', style({ opacity: 0, transform: 'translateX(20px)' })),
  transition(':enter, :leave', [animate('400ms ease-in-out')]),
]);
