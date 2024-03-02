/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import { Params } from '@angular/router';
import { NameWithId } from '../types/drop-lists-data.type';

export type ScheduleDataRes = {
  traceDetails: string[];
  scheduleHeaderData: string;
  currentChooseWeek: string;
  scheduleCanvasData: ScheduleCanvasData[];
};

export type ScheduleCanvasData = {
  weekdayNameWithId: NameWithId;
  weekdayDateTime: string;
  isNotShowingOccuredDates: boolean;
  weekdayData: WeekdayData[];
};

export type WeekdayData = {
  scheduleSubjectId: number;
  subjectWithTypeAlias: string;
  subjectTypeHexColor: string;
  subjectTime: string;
  positionFromTop: number;
  elementHeight: number;
  subjectOccuredData: string;
  ifNotShowingOccuredDates: boolean;
  aliases: {
    [aliasKey in AliasKey]?: {
      alias: string;
      pathValues: Params;
    }[];
  };
};

export type AliasKey = 'teachers' | 'rooms' | 'groups';
