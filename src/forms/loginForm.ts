import { object, string } from "yup";
export const loginForm = object({
  email: string()
    .email("The input is not an email")
    .required("The input is required"),
  password: string().min(6).max(32).required("The input is required"),
});
