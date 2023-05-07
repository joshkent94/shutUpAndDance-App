import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getMostLikedThreads, selectMostLiked } from '@utils/state/forumSlice'
import { useAppDispatch } from '@utils/state/store'
import ThreadOverview from '@components/ForumFeature/ThreadOverview'

export default function MostLikedThreadsWidget() {
    const dispatch = useAppDispatch()
    const mostLiked = useSelector(selectMostLiked)
    const firstRender = useRef(true)

    // get most liked threads on load if state is empty
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            dispatch(getMostLikedThreads())
        }
    })

    return (
        <div className="content-container widget">
            <h5 className="sub-heading content-container">
                Most Liked Threads
            </h5>
            <div className="widget-content">
                {mostLiked.map((thread) => {
                    return <ThreadOverview key={thread.id} thread={thread} />
                })}
            </div>
        </div>
    )
}
