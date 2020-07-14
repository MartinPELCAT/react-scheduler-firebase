import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isToday,
  isThisMonth,
  setHours,
  setMinutes,
  addMinutes,
  isAfter,
  roundToNearestMinutes,
  setSeconds,
  format,
  parse,
} from "date-fns";

/**
 * Just export direct functions
 */
export { isToday, isThisMonth };

/**
 * start week on monday
 */
const weekOption: {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
} = { weekStartsOn: 1 };

export const rangeHours = {
  start: { hour: 0, minutes: 0 },
  end: { hour: 23, minutes: 0 },
};

export const DATEFORMAT = "dd-MM-yyyy";

const minutesSteps: number = 30;

export const getFirstTimestampForDay = (timestamp: number): number => {
  return roundToNearestMinutes(
    setHours(
      setMinutes(setSeconds(timestamp, 0), rangeHours.start.minutes),
      rangeHours.start.hour
    ),
    { nearestTo: 1 }
  ).getTime();
};

export const getLastTimeStamForDay = (timestamp: number): number => {
  return addMinutes(
    roundToNearestMinutes(
      setHours(
        setMinutes(setSeconds(timestamp, 0), rangeHours.end.minutes),
        rangeHours.end.hour
      ),
      { nearestTo: 1 }
    ),
    30
  ).getTime();
};

export const getDayTimestampsForRange = (
  day: Date,
  range = rangeHours,
  step = minutesSteps
): Array<number> => {
  let dayStart = roundToNearestMinutes(
    setHours(
      setMinutes(setSeconds(day, 0), range.start.minutes),
      range.start.hour
    ),
    { nearestTo: 1 }
  );

  let dayEnd = roundToNearestMinutes(
    setHours(setMinutes(setSeconds(day, 0), range.end.minutes), range.end.hour),
    { nearestTo: 1 }
  );

  let timestamps: Array<number> = [];
  for (
    let hour = dayStart;
    isAfter(dayEnd, hour);
    hour = addMinutes(hour, step)
  ) {
    timestamps.push(hour.getTime());
  }
  timestamps.push(dayEnd.getTime());
  timestamps.push(addMinutes(dayEnd, step).getTime());

  return timestamps;
};

/**
 * @description get today date
 * @returns Date
 */
export const getTodayDate = (): Date => {
  return new Date();
};

/**
 * @description get all the days in the week of date
 * @param date : Date
 * @returns Array<Date>
 */
export const getWeekDaysOfDate = (date: Date): Array<Date> => {
  let sow = startOfWeek(date, weekOption);
  let eow = endOfWeek(date, weekOption);
  return eachDayOfInterval({ start: sow, end: eow });
};

/**
 * @description retrun all days of this week
 * @returns Array<Date>
 */
export const getCurrentWeekDays = (): Array<Date> => {
  return getWeekDaysOfDate(new Date());
};

/**
 * @description return all days in a month
 * @param date
 * @returns Array<Date>
 */
export const getMonthDays = (date: Date): Array<Date> => {
  let som = startOfMonth(date);
  let eom = endOfMonth(date);
  return eachDayOfInterval({ start: som, end: eom });
};

/**
 * @description Get all the days of this month
 */
export const getCurentMonthDays = (): Array<Date> => {
  return getMonthDays(new Date());
};

/**
 * @description get full days of month to display in a calendar
 * @param date
 */
export const getFullMonthDays = (date: Date): Array<Date> => {
  let sow = startOfWeek(startOfMonth(date), weekOption);
  let eow = endOfWeek(endOfMonth(date), weekOption);
  return eachDayOfInterval({ start: sow, end: eow });
};

/**
 * @description get current full days of month to display in a calendar
 */
export const getCurrentFullMonthDays = (): Array<Date> => {
  return getFullMonthDays(new Date());
};

const formatNumber = (number: number): string => {
  return `0${number}`.slice(-2);
};

const formatHour = (hour: number, minutes: number): string => {
  return formatNumber(hour).concat(":").concat(formatNumber(minutes));
};

const formatDateHour = (date: Date): string => {
  return formatHour(date.getHours(), date.getMinutes());
};

export const getDayHours = (
  date: Date,
  range = rangeHours
): Array<{ hour: string; date: Date }> => {
  let hours: Array<{ hour: string; date: Date }> = [];
  let start = roundToNearestMinutes(
    setMinutes(
      setSeconds(setHours(date, range.start.hour), 0),
      range.start.minutes
    ),
    { nearestTo: 1 }
  );
  let end = roundToNearestMinutes(
    setMinutes(
      setSeconds(setHours(date, range.end.hour), 0),
      range.end.minutes
    ),
    { nearestTo: 1 }
  );

  for (let hour = start; isAfter(end, hour); hour = addMinutes(hour, 60)) {
    hours.push({ hour: formatDateHour(hour), date: hour });
  }
  hours.push({ hour: formatDateHour(end), date: end });
  return hours;
};

export const formatDate = (date: Date): string => {
  return format(date, DATEFORMAT);
};

export const getDateFromString = (date: string | null): Date | null => {
  if (!!!date) {
    return null;
  }
  return parse(date, DATEFORMAT, new Date());
};
