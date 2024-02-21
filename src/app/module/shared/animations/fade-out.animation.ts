/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeOutAnimation = trigger('fadeOutAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('.5s ease-out', style({ opacity: 0 })),
  ]),
]);
