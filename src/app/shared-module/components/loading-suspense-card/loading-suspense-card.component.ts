/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component } from '@angular/core';
import { fadeOutAnimation } from '~/shared-module/animations/fade-out.animation';
import { SuspenseLoaderService } from '~/shared-module/service/suspense-loader/suspense-loader.service';

@Component({
  selector: 'app-loading-suspense-card',
  templateUrl: './loading-suspense-card.component.html',
  styleUrl: './loading-suspense-card.component.scss',
  animations: [fadeOutAnimation],
})
export class LoadingSuspenseCardComponent {
  isLoading$ = this._suspenseLoaderService.isLoading$;

  constructor(private readonly _suspenseLoaderService: SuspenseLoaderService) {}
}
