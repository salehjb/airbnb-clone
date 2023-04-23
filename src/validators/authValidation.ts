import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("invalid email"),
    name: Yup.string().required("name is required"),
    password: Yup.string().required("password is required"),
})

export const loginFormSchema = Yup.object().shape({
    email: Yup.string().required("email is required").email("invalid email"),
    password: Yup.string().required("password is required"),
})