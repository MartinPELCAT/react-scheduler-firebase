import { firestore } from "firebase";
import { getFirstTimestampForDay, getLastTimestampForDay } from "./DateService";
import { addMinutes } from "date-fns";

type Days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ReccurentOption {
  days: Days;
}

export interface ScheduleEvent {
  id?: string;
  title: string;
  description?: string;
  color: string;
  startTimestamp: firestore.Timestamp;
  endTimestamps: firestore.Timestamp;
  reccurent: boolean;
  reccurentOption?: ReccurentOption;
}

const models = {
  Events: "Events",
};

export const getDaysEvents = (
  firstDate: Date,
  lastDate: Date
): Promise<Array<ScheduleEvent>> => {
  let firstTimestamp = new Date(getFirstTimestampForDay(firstDate.getTime()));
  let lastTimestamp = addMinutes(
    new Date(getLastTimestampForDay(lastDate.getTime())),
    29
  );

  let dates1 = firestore()
    .collection(models.Events)
    .where("startTimestamp", ">=", firstTimestamp)
    .where("startTimestamp", "<=", lastTimestamp)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...(doc.data() as ScheduleEvent) };
      });
    });

  let dates2 = firestore()
    .collection(models.Events)
    .where("endTimestamps", ">=", firstTimestamp)
    .where("endTimestamps", "<=", lastTimestamp)
    .get()
    .then((snapshot) => {
      return snapshot.docs.map((doc) => {
        return { id: doc.id, ...(doc.data() as ScheduleEvent) };
      });
    });

  return Promise.all([dates1, dates2]).then(([resDate1, resDate2]) => {
    return resDate1.filter((dateStart) => {
      return resDate2.findIndex(({ id }) => id === dateStart.id) !== -1;
    });
  });
};
