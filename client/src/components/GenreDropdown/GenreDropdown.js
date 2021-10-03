import { useSelector } from 'react-redux';
import GenreOption from '../GenreOption/GenreOption';
import { hideCheckboxes, showCheckboxes } from '../../utils/helperFunctions/toggleCheckboxes';
import { selectAvailableGenres } from '../../utils/state/musicSlice';
import './GenreDropdown.css';
import { useState } from 'react';

export default function GenreDropdown() {
    const genreOptions = useSelector(selectAvailableGenres);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = e => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    const filteredGenres = genreOptions.filter(genre => {
        return genre.includes(searchTerm.toLowerCase())
    });

    return (
        <form id="search" onFocus={showCheckboxes} onBlur={hideCheckboxes}>
            <div className="multiselect">
                <input className="form-control" type="search" placeholder="Select genres... (max 5)" onChange={handleSearch}></input>
                <div id="genres">
                    {filteredGenres.map(genre => {
                        return <GenreOption key={genre} genre={genre} />
                    })}
                </div>
            </div>
        </form>
    );
};