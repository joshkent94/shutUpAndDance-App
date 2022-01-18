export const spotifyRedirect = (location) => {
    const dataToSend = {
        client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.NODE_ENV === 'production' ? `https://app.shutupanddance.io/spotify` : `https://localhost:3000/spotify`,
        scope: 'user-read-playback-state',
        state: [process.env.REACT_APP_SPOTIFY_STATE, location || '/'],
        show_dialog: true
    };
    const queryString = new URLSearchParams(dataToSend).toString();
    window.location.assign(`https://accounts.spotify.com/authorize?${queryString}`);
};