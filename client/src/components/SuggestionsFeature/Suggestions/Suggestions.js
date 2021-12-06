import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { selectGenres } from "../../../utils/state/userSlice";
import { getAvailableGenres, getSuggestions, selectAccessToken, selectAvailableGenres } from "../../../utils/state/suggestionsSlice";
import SongSuggestions from "../SongSuggestions/SongSuggestions";
import './Suggestions.css';

export default function Suggestions() {
    const availableGenres = useSelector(selectAvailableGenres);
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

    const handleRedoClick = () => {
        if (accessToken !== '') {
            dispatch(getSuggestions({
                accessToken: accessToken,
                genres: genres
            }));
        };
    };

    return (
        <div id="suggestions" className='main'>
            <GenreDropdown />
            <button className="btn account-submit" id="re-do" onClick={handleRedoClick}>
                Get Suggestions
            </button>
            <SongSuggestions />
        </div>
    );
};