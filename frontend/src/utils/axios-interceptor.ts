import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
    const onRequestSuccess = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
        console.log(import.meta.env.VITE_API_URL);
        // Biztosítjuk, hogy a headers létezik, és ha nem, inicializáljuk.
        if (token) {
            config.headers = config.headers || {};  // Inicializáljuk, ha nem léteznek.
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    };

    const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

    const onResponseError = (err: AxiosError): Promise<AxiosError> => {
        const status = err.response?.status || 0;
        if (status === 401) {
            onUnauthenticated();
        }
        return Promise.reject(err);
    };

    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
