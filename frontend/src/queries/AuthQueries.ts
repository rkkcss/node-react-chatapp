import { API } from "../utils/API";

export type LoginFormType = {
    login: string,
    password: string
}

export type RegistrationFormType = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    login: string
}

export const loginQuery = (loginData: LoginFormType) => {
    return API.post("/api/authenticate", loginData);
}

export const registrationQuery = (formData: RegistrationFormType) => {
    return API.post("/api/register", formData);
}