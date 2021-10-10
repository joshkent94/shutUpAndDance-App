import { Link } from "react-router-dom";

export default function ForumHome() {
    return (
        <button>
            <Link to="/forum/new">New Thread</Link>
        </button>
    );
};