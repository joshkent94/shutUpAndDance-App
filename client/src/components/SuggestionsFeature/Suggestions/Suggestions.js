import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { getAvailableGenres, selectAccessToken, selectAvailableGenres } from "../../../utils/state/suggestionsSlice";
import SongSuggestions from "../SongSuggestions/SongSuggestions";
import './Suggestions.css';

export default function Suggestions() {
    const availableGenres = useSelector(selectAvailableGenres);
    const accessToken = useSelector(selectAccessToken);
    const dispatch = useDispatch();

    // get genre list from Spotify
    useEffect(() => {
        if (accessToken !== '' && availableGenres.length === 0) {
            dispatch(getAvailableGenres({
                accessToken: accessToken
            }));
        };
    }, [dispatch, accessToken, availableGenres]);

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    Suggestions
                </h5>
                <GenreDropdown />
            </div>
            <div className="page-content">
                <SongSuggestions />
            </div>
        </div>
    );
};