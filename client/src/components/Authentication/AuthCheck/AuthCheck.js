import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectAccessToken } from "../../../utils/state/suggestionsSlice";

export default function AuthCheck({ children }) {
    const location = useLocation();
    const accessToken = useSelector(selectAccessToken);

    let content;
    let loggedIn = document.cookie && accessToken;
    if (location.pathname === '/login' || location.pathname === '/signup') {
        content =
            loggedIn
                ? <Navigate
                    to="/dashboard"
                    replace
                />
                : children
    } else {
        content =
            loggedIn
                ? children
                : <Navigate
                    to="/login"
                    replace
                />;
    };

    return content;
};