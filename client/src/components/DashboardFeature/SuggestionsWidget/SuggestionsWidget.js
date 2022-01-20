import { useDispatch, useSelector } from "react-redux";
import { getSuggestions, selectAccessToken, selectRefreshToken, selectSuggestions } from "../../../utils/state/spotifySlice";
import Suggestion from "../../SuggestionsFeature/Suggestion/Suggestion";
import { selectGenres } from "../../../utils/state/userSlice";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SuggestionsWidget.css';

export default function SuggestionsWidget() {
    const dispatch = useDispatch();
    const suggestions = useSelector(selectSuggestions);
    const selectedGenres = useSelector(selectGenres);
    const accessToken = useSelector(selectAccessToken);
    const refreshToken = useSelector(selectRefreshToken);
    const firstRender = useRef(true);

    // get suggestions from Spotify
    const handleSuggestionSearch = e => {
        e.preventDefault();
        if (document.cookie && accessToken !== '') {
            dispatch(getSuggestions({
                accessToken,
                refreshToken,
                genres: selectedGenres
            }));
        };
    };

    // get song suggestions from Spotify on initial page load
    useEffect(() => {
        if (suggestions.length === 0 && document.cookie && accessToken !== '' && firstRender.current) {
            firstRender.current = false;
            dispatch(getSuggestions({
                accessToken,
                refreshToken,
                genres: selectedGenres
            }));
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
        <div>
            <div className="content-container widget animate__animated animate__fadeIn">
                <div className="input-group">
                <h5 className="sub-heading content-container">
                    Suggestions
                </h5>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" id="search-button" type="button" onClick={handleSuggestionSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div className="widget-content">
                    {content}
                </div>
            </div>
        </div>
    );
};