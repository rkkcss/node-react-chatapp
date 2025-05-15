import { API } from "../utils/API"

export const searchInUsersQuery = (name: string) => {
    return API.get("/api/users/search", { params: { name } });
}