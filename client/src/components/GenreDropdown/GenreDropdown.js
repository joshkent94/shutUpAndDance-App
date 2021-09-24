import { useSelector } from 'react-redux';
import GenreOption from '../GenreOption/GenreOption';
import { showCheckboxes } from '../../utils/helperFunctions/showCheckboxes';
import { selectAvailableGenres } from '../../utils/state/musicSlice';
import './GenreDropdown.css';

export default function GenreDropdown() {
    const genreOptions = useSelector(selectAvailableGenres);

    return (
        <form>
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckboxes}>
                    <select id="genre-dropdown" className="form-select">
                        <option>Select genres (max 5)</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="genres">
                    {genreOptions.map(genre => {
                        return <GenreOption key={genre} genre={genre} />
                    })}
                </div>
            </div>
        </form>
    );
};