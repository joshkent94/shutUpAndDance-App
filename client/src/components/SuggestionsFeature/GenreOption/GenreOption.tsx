import { useSelector } from 'react-redux'
import { selectGenres, setGenres } from '../../../utils/state/userSlice'
import { useAppDispatch } from '../../../utils/state/store'
import './GenreOption.scss'

export default function GenreOption(props) {
    const dispatch = useAppDispatch()
    const genre = props.genre
    const selectedGenres = useSelector(selectGenres)

    const handleGenreSelect = (e) => {
        dispatch(setGenres(e.target.value))
    }

    return (
        <label htmlFor={genre} className="genre-label">
            <input
                className="genre-checkbox"
                type="checkbox"
                id={genre}
                value={genre.toLowerCase()}
                onClick={handleGenreSelect}
                checked={selectedGenres.includes(genre.toLowerCase())}
                readOnly
            />
            <p className="genre">{genre}</p>
        </label>
    )
}
