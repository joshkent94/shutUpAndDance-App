import { useDispatch, useSelector } from "react-redux";
import { selectGenres, setGenres } from "../../utils/state/userSlice";
import './GenreOption.css';

export default function GenreOption(props) {
    const genre = props.genre;
    const selectedGenres = useSelector(selectGenres);
    const dispatch = useDispatch();

    const handleGenreSelect = e => {
        dispatch(setGenres(e.target.value));
    };

    return (
        <label htmlFor={genre} className="genre-label">
            <input
                className="genre-checkbox"
                type="checkbox"
                id={genre}
                value={genre.toLowerCase()}
                onClick={handleGenreSelect}
                checked={selectedGenres.includes(genre.toLowerCase())}
                readOnly />
            <p className="genre">{genre}</p>
        </label>
    );
};