import * as Yup from "yup";

export const ValidationForm = Yup.object({
  name: Yup.string().min(3).required("Please enter name"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("please enter email"),
  contact: Yup.string().required("Contact number is required"),
  //   date: Yup.string().date().required("please select the date"),
  hobbies: Yup.string().required("Please enter hobbies"),
});
