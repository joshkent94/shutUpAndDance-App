import { useSelector } from 'react-redux';
import GenreOption from '../GenreOption/GenreOption';
import { hideCheckboxes, showCheckboxes } from '../../utils/helperFunctions/toggleCheckboxes';
import { selectAvailableGenres } from '../../utils/state/suggestionsSlice';
import './GenreDropdown.css';
import { useState } from 'react';
import { selectGenres } from '../../utils/state/userSlice';

export default function GenreDropdown() {
    const genreOptions = useSelector(selectAvailableGenres);
    const selectedGenres = useSelector(selectGenres);
    const [searchTerm, setSearchTerm] = useState('');

    const sortedGenres = selectedGenres.slice().sort();

    const handleSearch = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const filteredSortedGenres = sortedGenres.filter(genre => {
        return genre.includes(searchTerm.toLowerCase())
    });
    
    const filteredGenres = genreOptions.filter(genre => {
        return genre.includes(searchTerm.toLowerCase())
    });

    return (
        <form id="search" onFocus={showCheckboxes} onBlur={hideCheckboxes}>
            <div className="multiselect">
                <input className="form-control" type="search" placeholder="Select genres... (max 5)" onChange={handleSearch}></input>
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