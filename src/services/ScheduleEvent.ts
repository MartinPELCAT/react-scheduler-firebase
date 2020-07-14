type Days = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ReccurentOption {
  days: Days;
}

export interface ScheduleEvent {
  title: string;
  description?: string;
  color: string;
  startTimestamp: number;
  endTimestamps: number;
  reccurent: boolean;
  reccurentOption?: ReccurentOption;
}
