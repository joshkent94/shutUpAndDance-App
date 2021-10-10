import { useDispatch, useSelector } from "react-redux";
import { getSuggestions, selectAccessToken, selectSuggestions } from "../../utils/state/suggestionsSlice";
import Suggestion from "../Suggestion/Suggestion";
import './Suggestions.css';
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { selectFirstName, selectGenres } from "../../utils/state/userSlice";
import crowd from '../../assets/signed-in-background.jpeg';

export default function Suggestions() {
    const suggestions = useSelector(selectSuggestions);
    const firstName = useSelector(selectFirstName);
    const accessToken = useSelector(selectAccessToken);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    const handleRedoClick = () => {
        dispatch(getSuggestions({
            accessToken: accessToken,
            genres: genres
        }));
    };

    let content;
    if (suggestions.length === 0) {
        content =
            <div className="suggestions-content">
                <h5 className="sub-heading">Please select at least one genre to see suggestions.</h5>
            </div>;
    } else {
        content =
            <div className="suggestions-content">
                <div id="suggestions-left">
                    {suggestions.map(track => {
                        return <Suggestion key={track.id} track={track} />
                    })}
                </div>
                <div id="suggestions-right">
                <img src={crowd} alt='crowd' id="suggestions-image" />
                <button className="btn account-submit" id="re-do" onClick={handleRedoClick}>
                    Go Again
                </button>
                </div>
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