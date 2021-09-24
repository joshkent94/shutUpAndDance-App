import { baseDomain } from "../envConfig";

export const submitRegistration = async (firstName, lastName, email, password, validatedPassword) => {
    if (password !== validatedPassword) {
        return {
            message: 'Passwords do not match.'
        };
    } else {
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
        const response = await fetch(`${baseDomain}/register`, {
            method: "POST",
            mode: "cors",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        };
        const jsonResponse = await response.json();
        return jsonResponse;
    };
};