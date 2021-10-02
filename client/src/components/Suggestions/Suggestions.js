import { useSelector } from "react-redux";
import { selectSuggestions } from "../../utils/state/musicSlice";
import Suggestion from "../Suggestion/Suggestion";
import Subnav from "../Subnav/Subnav";
import './Suggestions.css';

export default function Suggestions() {
    const suggestions = useSelector(selectSuggestions);

    let content;
    if (suggestions.length === 0) {
        content =
            <div id="suggestions">
                <Subnav />
                <div className="content">
                    <div>
                        Select genres to see suggestions.
                    </div>
                </div>
            </div>;
    } else {
        content =
            <div id="suggestions">
                <Subnav />
                <div className="content">
                    {suggestions.map(track => {
                        return <Suggestion key={track.id} track={track} />
                    })}
                </div>
            </div>;
    };

    return (
        content
    );
};