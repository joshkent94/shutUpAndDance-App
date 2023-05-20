import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
    hideCheckboxes,
    showCheckboxes,
} from '@utils/helperFunctions/toggleCheckboxes'
import {
    getSuggestions,
    selectAccessToken,
    selectAvailableGenres,
    selectRefreshToken,
} from '@utils/state/spotifySlice'
import { selectGenres, updateGenres } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'
import GenreOption from './GenreOption'

export default function GenreDropdown({ setLoading }) {
    const dispatch = useAppDispatch()
    const genreOptions = useSelector(selectAvailableGenres)
    const selectedGenres = useSelector(selectGenres)
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const [searchTerm, setSearchTerm] = useState('')
    const firstRender = useRef(true)
    const faSearchProp = faSearch as IconProp

    const handleSearchTermChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    // get suggestions from Spotify
    const handleSuggestionSearch = (e) => {
        e.preventDefault()
        if (accessToken !== '') {
            setLoading(true)
            dispatch(
                getSuggestions({
                    accessToken,
                    refreshToken,
                    genres: selectedGenres,
                })
            ).then(() => setLoading(false))
        }
    }

    // calculate selected genres filtered by search term and in alphabetical order
    const filteredSortedGenres = selectedGenres
        .slice()
        .sort()
        .filter((genre) => {
            return genre.includes(searchTerm.toLowerCase())
        })

    // calculate available genres filtered by search term and in alphabetical order
    const filteredGenres = genreOptions.filter((genre) => {
        return genre.includes(searchTerm.toLowerCase())
    })

    // update genres in db whenever selected genres change
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            return
        }
        dispatch(updateGenres(selectedGenres))
    }, [dispatch, selectedGenres])

    return (
        <form>
            <div className="w-48 md:w-[320px]">
                <div className="input-group">
                    <input
                        className="form-control z-40 border border-third px-[0.7rem] py-[0.3rem] text-primary placeholder:text-third focus:border-primary focus:shadow-none"
                        type="search"
                        placeholder={`Select genres (5 max, ${selectedGenres.length} chosen)`}
                        aria-label="search genres"
                        onChange={handleSearchTermChange}
                        onFocus={showCheckboxes}
                        onBlur={hideCheckboxes}
                        autoComplete="off"
                    />
                    <div>
                        <button
                            className="btn btn-outline-secondary rounded-bl-none rounded-tl-none border-third bg-secondary text-primary focus:shadow-none"
                            type="button"
                            onClick={handleSuggestionSearch}
                        >
                            <FontAwesomeIcon icon={faSearchProp} />
                        </button>
                    </div>
                </div>
                <div
                    id="dropdown"
                    className="absolute z-40 hidden max-h-[300px] w-48 overflow-y-scroll rounded border border-third bg-secondary p-[0.6rem] font-normal md:w-[320px]"
                >
                    <div className="border-b border-b-third pb-2.5">
                        <p className="mb-[0.3rem] indent-[0.3rem] font-semibold">
                            Selected Genres
                        </p>
                        {filteredSortedGenres.map((genre) => {
                            return <GenreOption key={genre} genre={genre} />
                        })}
                    </div>
                    <div className="pt-2">
                        <p className="mb-[0.3rem] indent-[0.3rem] font-semibold">
                            Genre Options
                        </p>
                        {filteredGenres.map((genre) => {
                            return <GenreOption key={genre} genre={genre} />
                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}
