import { Navigate, useLocation } from "react-router-dom";

export default function AuthCheck({ children }) {
    const location = useLocation();

    let content;
    if (location.pathname === '/login') {
        content =
            document.cookie
                ? <Navigate
                    to="/dashboard"
                    replace
                />
                : children;
    } else {
        content =
            document.cookie
                ? children
                : <Navigate
                    to="/login"
                    replace
                    state={{ path: location.pathname }}
                />;
    };

    return content;
};