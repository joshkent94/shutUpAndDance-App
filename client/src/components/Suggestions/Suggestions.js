import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Suggestion from "../Suggestion/Suggestion";
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { selectFirstName, selectGenres } from "../../utils/state/userSlice";
import { getAvailableGenres, getSuggestions, selectAccessToken, selectAvailableGenres, selectSuggestions } from "../../utils/state/suggestionsSlice";
import crowd from '../../assets/signed-in-background.jpeg';
import './Suggestions.css';

export default function Suggestions() {
    const suggestions = useSelector(selectSuggestions);
    const availableGenres = useSelector(selectAvailableGenres);
    const firstName = useSelector(selectFirstName);
    const accessToken = useSelector(selectAccessToken);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();

    // get genre list from Spotify
    useEffect(() => {
        if (accessToken !== '' && availableGenres.length === 0) {
            dispatch(getAvailableGenres({
                accessToken: accessToken
            }));
        };
    }, [dispatch, accessToken, availableGenres]);
  
    // get song suggestions from Spotify
    useEffect(() => {
        if (accessToken !== '' && suggestions.length === 0) {
            dispatch(getSuggestions({
                accessToken: accessToken,
                genres: genres
            }));
        };
    }, [genres, accessToken, dispatch, suggestions]);

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