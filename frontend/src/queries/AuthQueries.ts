import axios from "axios";
import { API } from "../utils/API";

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
    console.log(axios.defaults.baseURL)
    return API.post("/api/authenticate", loginData);
}

export const logoutQuery = () => {
    return API.post("/api/logout");
}

export const registrationQuery = (formData: RegistrationFormType) => {
    return API.post("/api/register", formData);
}