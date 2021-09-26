export const getGenres = async () => {
    const response = await fetch(`/genres`, {
        mode: "cors",
        credentials: "include"
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
    };
};