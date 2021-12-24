import { useDispatch } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import { resetForumDetails } from "../../../utils/state/forumSlice";
import { getAccessToken, resetSuggestionsDetails } from '../../../utils/state/suggestionsSlice';
import { logout } from "../../../utils/state/userSlice";

export default function SpotifyAuthentication() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    let content = null;

    if (state === process.env.REACT_APP_SPOTIFY_STATE && code) {
        dispatch(getAccessToken(code));
        content =
            <Navigate
                to="/dashboard"
            />;
    } else if (!code || state !== process.env.REACT_APP_SPOTIFY_STATE) {
        content =
            <Navigate
                to="/login"
            />;
        dispatch(logout())
            .unwrap()
            .then(() => {
                dispatch(resetSuggestionsDetails());
                dispatch(resetForumDetails());
            });
    };

    return content;
};