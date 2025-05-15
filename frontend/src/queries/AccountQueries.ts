import { API } from "../utils/API";

export const meQuery = async () => {
    return API.get("/api/account");
}