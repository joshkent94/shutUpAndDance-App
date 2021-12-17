import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import GenreOption from '../GenreOption/GenreOption';
import { hideCheckboxes, showCheckboxes } from '../../../utils/helperFunctions/toggleCheckboxes';
import { getSuggestions, selectAccessToken, selectAvailableGenres } from '../../../utils/state/suggestionsSlice';
import { selectGenres, updateGenres } from '../../../utils/state/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './GenreDropdown.css';

export default function GenreDropdown() {
    const dispatch = useDispatch();
    const genreOptions = useSelector(selectAvailableGenres);
    const selectedGenres = useSelector(selectGenres);
    const accessToken = useSelector(selectAccessToken);
    const [searchTerm, setSearchTerm] = useState('');
    const firstRender = useRef(true);

    const handleSearchTermChange = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    // get suggestions from Spotify
    const handleSuggestionSearch = e => {
        e.preventDefault();
        if (document.cookie && accessToken !== '') {
            dispatch(getSuggestions({
                accessToken: accessToken,
                genres: selectedGenres
            }));
        };
    };

    // calculate selected genres filtered by search term and in alphabetical order
    const filteredSortedGenres = selectedGenres.slice().sort().filter(genre => {
        return genre.includes(searchTerm.toLowerCase())
    });

    // calculate available genres filtered by search term and in alphabetical order
    const filteredGenres = genreOptions.filter(genre => {
        return genre.includes(searchTerm.toLowerCase())
    });

    // update genres in db whenever selected genres change
    useEffect(() => {
        if (document.cookie) {
            if (firstRender.current) {
                firstRender.current = false;
                return;
            }
            dispatch(updateGenres(selectedGenres));
        };
    }, [dispatch, selectedGenres]);

    return (
        <form>
            <div id="multiselect">
                <div className="input-group">
                    <input className="form-control" id="genre-input" type="search" placeholder={`Select genres (5 max, ${selectedGenres.length} chosen)`} aria-label="search genres" onChange={handleSearchTermChange} onFocus={showCheckboxes} onBlur={hideCheckboxes}></input>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" id="search-button" type="button" onClick={handleSuggestionSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>
                </div>
                <div id="genres">
                    <div id="selected-genres">
                        <p className="dropdown-heading">Selected Genres</p>
                        {filteredSortedGenres.map(genre => {
                            return <GenreOption key={genre} genre={genre} />
                        })}
                    </div>
                    <div id="genre-options">
                        <p className="dropdown-heading">Genre Options</p>
                        {filteredGenres.map(genre => {
                            return <GenreOption key={genre} genre={genre} />
                        })}
                    </div>
                </div>
            </div>
        </form>
    );
};