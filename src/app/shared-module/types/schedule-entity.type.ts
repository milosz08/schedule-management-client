export type ScheduleEntity = 'group' | 'employer' | 'room' | 'none';

export type RouteManager = {
  [key in Exclude<ScheduleEntity, 'none'>]: string[];
};

export type ErrorReason = 'route' | 'unknow' | 'none';

export type ScheduleFilterData = {
  year: number | null;
  week: number | null;
};
