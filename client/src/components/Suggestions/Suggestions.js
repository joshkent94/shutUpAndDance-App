import { useSelector } from "react-redux";
import { selectSuggestions } from "../../utils/state/musicSlice";
import Suggestion from "../Suggestion/Suggestion";
import './Suggestions.css';
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { selectFirstName } from "../../utils/state/userSlice";

export default function Suggestions() {
    const suggestions = useSelector(selectSuggestions);
    const firstName = useSelector(selectFirstName);

    let content;
    if (suggestions.length === 0) {
        content =
            <div className="suggestions-content">
                <div>
                    Select genres to see suggestions.
                </div>
            </div>;
    } else {
        content =
            <div className="suggestions-content">
                {suggestions.map(track => {
                    return <Suggestion key={track.id} track={track} />
                })}
            </div>;
    };

    return (
        <div id="suggestions">
            <div className="heading">
                <h3>{firstName}'s Suggestions</h3>
                <GenreDropdown />
            </div>
            {content}
        </div>
    );
};