/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import {
  AliasKey,
  WeekdayData,
} from '~/shared-module/models/schedule-data.model';
import { ScheduleEntity } from '~/shared-module/types/schedule-entity.type';

@Component({
  selector: 'app-schedule-block',
  templateUrl: './schedule-block.component.html',
  styleUrl: './schedule-block.component.scss',
})
export class ScheduleBlockComponent {
  @Input() weekdayData?: WeekdayData;
  @Input() hrefEventsDisabled = false;
  @Input() addedPxFromTop = 0;

  handleOpenDetailsModal(): void {}

  disableEventPropagation(event: Event): void {
    event.stopPropagation();
  }

  fabricateRouteParams(baseParams: Params, routeFor: ScheduleEntity): Params {
    return { for: routeFor, ...baseParams };
  }

  hasKey(key: AliasKey): boolean {
    const aliases = this.weekdayData?.aliases;
    if (!aliases) {
      return false;
    }
    return (Object.keys(aliases) as AliasKey[]).some(
      aliasKey => aliasKey === key
    );
  }
}
