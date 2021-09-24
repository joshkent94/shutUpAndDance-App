import { baseDomain } from "../envConfig";

export const getGenres = async () => {
    const response = await fetch(`${baseDomain}/genres`, {
        mode: "cors",
        credentials: "include"
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
    };
};