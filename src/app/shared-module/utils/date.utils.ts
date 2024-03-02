/*
 * Copyright (c) 2024 by Miłosz Gilga <https://miloszgilga.pl>
 * Silesian University of Technology
 */
import moment from 'moment';

export const getCurrentStudyYear = (): string => {
  const now = moment();
  return now.month() < 10
    ? `${now.year() - 1}/${now.year()}`
    : `${now.year()}/${now.year() + 1}`;
};

export const getCurrentWeek = (): string => {
  const now = moment();
  return `${now.weekday(1).format('DD.MM')} - ${now.weekday(7).format('DD.MM')} (${now.year()}, ${now.isoWeek()})`;
};

export const fabricateHoursTable = (): string[] => {
  return Array.from({ length: 16 }, (_, j) => `${j + 7}:00`);
};
