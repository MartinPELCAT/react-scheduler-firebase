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

type HourType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

type MinuteType = 0 | 30;

const formatNumber = (number: number): string => {
  return `0${number}`.slice(-2);
};

const formatHour = (hour: number, minutes: number): string => {
  return formatNumber(hour).concat(":").concat(formatNumber(minutes));
};

const formatDateHour = (date: Date): string => {
  return formatHour(date.getHours(), date.getMinutes());
};

export const getDayHours = (datas: {
  date: Date;
  startHour: { hour: HourType; minutes: MinuteType };
  endHour: { hour: HourType; minutes: MinuteType };
}): Array<{ hour: string; date: Date }> => {
  let hours: Array<{ hour: string; date: Date }> = [];
  let start = roundToNearestMinutes(
    setMinutes(
      setSeconds(setHours(datas.date, datas.startHour.hour), 0),
      datas.startHour.minutes
    ),
    { nearestTo: 1 }
  );
  let end = roundToNearestMinutes(
    setMinutes(
      setSeconds(setHours(datas.date, datas.endHour.hour), 0),
      datas.endHour.minutes
    ),
    { nearestTo: 1 }
  );

  for (let hour = start; isAfter(end, hour); hour = addMinutes(hour, 60)) {
    hours.push({ hour: formatDateHour(hour), date: hour });
  }
  hours.push({ hour: formatDateHour(end), date: end });
  return hours;
};
