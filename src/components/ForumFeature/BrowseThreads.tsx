import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    getMostLikedThreads,
    searchThreads,
    selectMostLiked,
    selectThreads,
} from '@utils/state/forumSlice'
import { useAppDispatch } from '@utils/state/store'
import ThreadOverview from './ThreadOverview'

export default function BrowseThreads({ searchTerm }) {
    const dispatch = useAppDispatch()
    const threads = useSelector(selectThreads)
    const mostLiked = useSelector(selectMostLiked)

    // get most liked threads if search term is blank &
    // search for threads whenever search term is updated
    useEffect(() => {
        if (!searchTerm) {
            dispatch(getMostLikedThreads())
        }
        if (searchTerm) {
            dispatch(
                searchThreads({
                    searchTerm: searchTerm,
                })
            )
        }
    }, [dispatch, searchTerm])

    let content
    if (!searchTerm) {
        content = mostLiked.map((thread) => {
            return <ThreadOverview key={thread.id} thread={thread} />
        })
    } else {
        content = threads.map((thread) => {
            return <ThreadOverview key={thread.id} thread={thread} />
        })
    }

    return <div id="browse-threads-page">{content}</div>
}
