import { object, string, boolean, number } from "yup";

export const eventForm = object({
  startDate: number().required(),
  endDate: number().required(),
  title: string().required(),
  description: string(),
  reccurent: boolean(),
  color: string().required(),
});
