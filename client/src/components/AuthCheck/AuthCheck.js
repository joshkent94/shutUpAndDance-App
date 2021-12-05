import { Navigate, useLocation } from "react-router-dom";

export default function AuthCheck({ children }) {
    const location = useLocation();

    return document.cookie
        ? children
        : <Navigate
            to="/login"
            replace
            state={{ path: location.pathname }}
        />;
};