import { API } from "../utils/API";
import { APILogin } from "../utils/APILogin";

export type LoginFormType = {
    login: string,
    password: string
}

export type RegistrationFormType = {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

export const loginQuery = (loginData: LoginFormType) => {
    return APILogin.post("/api/authentication", loginData);
}

export const logoutQuery = () => {
    return API.post("/api/logout");
}

export const registrationQuery = (formData: RegistrationFormType) => {
    return API.post("/api/register", formData);
}