import { animate, style, transition, trigger } from '@angular/animations';

export const fadeOutAnimation = trigger('fadeOutAnimation', [
  transition(':leave', [
    style({ opacity: 1 }),
    animate('.5s ease-out', style({ opacity: 0 })),
  ]),
]);
