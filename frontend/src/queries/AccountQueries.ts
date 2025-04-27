import { API } from "../utils/API";

export const meQuery = () => {
    return API.get("/api/account");
}