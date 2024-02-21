/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('.2s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('.2s ease-out', style({ opacity: 0 })),
  ]),
]);
