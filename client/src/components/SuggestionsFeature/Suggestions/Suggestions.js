import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenreDropdown from '../GenreDropdown/GenreDropdown';
import { getAvailableGenres, getSuggestions, selectAccessToken, selectAvailableGenres, selectRefreshToken, selectSuggestions } from "../../../utils/state/spotifySlice";
import { selectGenres } from "../../../utils/state/userSlice";
import Suggestion from "../Suggestion/Suggestion";
import './Suggestions.css';

export default function Suggestions() {
    const availableGenres = useSelector(selectAvailableGenres);
    const accessToken = useSelector(selectAccessToken);
    const refreshToken = useSelector(selectRefreshToken);
    const suggestions = useSelector(selectSuggestions);
    const genres = useSelector(selectGenres);
    const dispatch = useDispatch();
    const firstRender = useRef(true);

    // get genre list and song suggestions from Spotify on initial page load
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            if (accessToken !== '' && availableGenres.length === 0) {
                dispatch(getAvailableGenres({
                    accessToken,
                    refreshToken
                }));
            };
            if (suggestions.length === 0 && document.cookie && accessToken !== '') {
                dispatch(getSuggestions({
                    accessToken,
                    refreshToken,
                    genres
                }));
            };
        };
    });

    let content;
    if (suggestions.length === 0) {
        content =
            <h5 className="sub-heading">
                Please select at least one genre to see suggestions.
            </h5>;
    } else {
        content =
            suggestions.map(track => {
                return <Suggestion key={track.id} track={track} />
            });
    };

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    Suggestions
                </h5>
                <GenreDropdown />
            </div>
            <div className="page-content">
                <div id="suggestions-page">
                    {content}
                </div>
            </div>
        </div>
    );
};