import axios from "axios";

const serverMode = import.meta.env.VITE_API_URL;

export const API = axios.create({
    baseURL: serverMode,
});

API.interceptors.request.use(
    async (config) => {
        config.withCredentials = true;
        config.headers["Accept"] = "application/json";
        config.headers["Content-Type"] = "application/json";
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');

        if (token) {
            config.headers = config.headers || {};  // Inicializáljuk, ha nem léteznek.
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("err", error);
        if (error.response.status === 401) {
            // window.location.href = "/logout";
        }
        return Promise.reject(error);
    }
);