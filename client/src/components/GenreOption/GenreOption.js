import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectGenres, updateGenres } from "../../utils/state/userSlice";
import './GenreOption.css';

export default function GenreOption(props) {
    const dispatch = useDispatch();
    const genre = props.genre;
    const selectedGenres = useSelector(selectGenres);
    const [localGenres, setLocalGenres] = useState(selectedGenres);

    const handleGenreSelect = e => {
        if (localGenres.includes(e.target.value)) {
            setLocalGenres(genres => genres.filter(genre => genre !== e.target.value));
        } else {
            setLocalGenres(genres => [...genres, e.target.value]);
        };
        dispatch(updateGenres(localGenres));
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