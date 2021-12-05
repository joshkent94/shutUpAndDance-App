import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from 'react';
import { selectSuggestions, getSuggestions, selectAccessToken } from "../../../utils/state/suggestionsSlice";
import Suggestion from "../Suggestion/Suggestion";
import { selectFirstName, selectGenres } from "../../../utils/state/userSlice";

export default function SongSuggestions() {
    const dispatch = useDispatch();
    const firstName = useSelector(selectFirstName);
    const suggestions = useSelector(selectSuggestions);
    const accessToken = useSelector(selectAccessToken);
    const genres = useSelector(selectGenres);
    const firstRenderOne = useRef(true);
    const firstRenderTwo = useRef(true);

    // get song suggestions from Spotify if suggestions are blank
    // or the user's selected genres change
    useEffect(() => {
        if (firstRenderOne.current) {
            firstRenderOne.current = false;
            return;
        }
        if (accessToken !== '') {
            dispatch(getSuggestions({
                accessToken: accessToken,
                genres: genres
            }));
        };
    }, [genres, accessToken, dispatch]);
    useEffect(() => {
        if (firstRenderTwo.current) {
            firstRenderTwo.current = false;
            if (suggestions.length === 0 && firstName && accessToken !== '') {
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
            <div className="suggestions-content">
                <h5 className="sub-heading">Please select at least one genre to see suggestions.</h5>
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
        <div>
            {content}
        </div>
    );
}