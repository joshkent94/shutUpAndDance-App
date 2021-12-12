import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from 'react';
import { selectSuggestions, getSuggestions, selectAccessToken } from "../../../utils/state/suggestionsSlice";
import Suggestion from "../Suggestion/Suggestion";
import { selectGenres } from "../../../utils/state/userSlice";
import './SongSuggestions.css';

export default function SongSuggestions() {
    const dispatch = useDispatch();
    const suggestions = useSelector(selectSuggestions);
    const accessToken = useSelector(selectAccessToken);
    const genres = useSelector(selectGenres);
    const firstRender = useRef(true);

    // get song suggestions from Spotify on initial page load
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            if (suggestions.length === 0 && document.cookie && accessToken !== '') {
                dispatch(getSuggestions({
                    accessToken: accessToken,
                    genres: genres
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
        <div id="suggestions-page">
            {content}
        </div>
    );
};