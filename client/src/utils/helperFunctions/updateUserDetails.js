import { showMessage } from "./showMessage";

export const updateUserDetails = async (details) => {
    const response = await fetch(`/user`, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(details),
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (response.ok) {
        showMessage(`User details updated.`);
    } else {
        showMessage(`User details not updated.`);
    };
};