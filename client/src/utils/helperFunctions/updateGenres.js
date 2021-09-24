import { baseDomain } from "../envConfig";

export const updateGenres = async (genres) => {
    await fetch(`${baseDomain}/user`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(genres),
        headers: {
            "Content-Type": "application/json"
        }
    });
};