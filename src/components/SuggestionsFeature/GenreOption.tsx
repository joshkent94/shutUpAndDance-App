import { useSelector } from 'react-redux'
import { selectGenres, setGenres } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function GenreOption(props) {
    const dispatch = useAppDispatch()
    const genre = props.genre
    const selectedGenres = useSelector(selectGenres)

    const handleGenreSelect = (e) => {
        dispatch(setGenres(e.target.value))
    }

    return (
        <label
            htmlFor={genre}
            className="dropdown-option flex h-[1.8rem] items-center hover:cursor-pointer hover:bg-fifth hover:text-primary"
        >
            <input
                className="relative ml-[0.8rem] mr-4 box-border inline-block appearance-none rounded-[3px] border border-third p-[7px] checked:bg-secondary checked:after:absolute checked:after:-top-0.5 checked:after:left-px checked:after:text-[13px] checked:after:text-primary checked:after:content-['\2714'] hover:cursor-pointer"
                type="checkbox"
                id={genre}
                value={genre.toLowerCase()}
                onClick={handleGenreSelect}
                checked={selectedGenres.includes(genre.toLowerCase())}
                readOnly
            />
            <p className="m-0 mr-1 overflow-hidden text-ellipsis whitespace-nowrap font-normal capitalize">
                {genre}
            </p>
        </label>
    )
}
