import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getThreadsByUserId, selectUserThreads } from '@utils/state/forumSlice'
import { useAppDispatch } from '@utils/state/store'
import ThreadOverview from '@components/ForumFeature/ThreadOverview'

export default function MyThreadsWidget() {
    const dispatch = useAppDispatch()
    const userThreads = useSelector(selectUserThreads)
    const firstRender = useRef(true)

    // get most liked threads on load if state is empty
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            dispatch(getThreadsByUserId())
        }
    })

    return (
        <div className="content-container widget">
            <h5 className="sub-heading content-container">My Threads</h5>
            <div className="widget-content">
                {userThreads.map((thread) => {
                    return <ThreadOverview key={thread.id} thread={thread} />
                })}
            </div>
        </div>
    )
}
