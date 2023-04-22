import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
    getThreadsByUserId,
    selectUserThreads,
} from '../../../utils/state/forumSlice'
import ThreadOverview from '../../ForumFeature/ThreadOverview/ThreadOverview'
import { useAppDispatch } from '../../../utils/state/store'

export default function MyThreadsWidget() {
    const dispatch = useAppDispatch()
    const userThreads = useSelector(selectUserThreads)
    const firstRender = useRef(true)

    // get most liked threads on load if state is empty
    useEffect(() => {
        if (document.cookie && firstRender.current) {
            firstRender.current = false
            dispatch(getThreadsByUserId())
        }
    })

    return (
        <div className="content-container widget animate__animated animate__fadeIn">
            <h5 className="sub-heading content-container">My Threads</h5>
            <div className="widget-content">
                {userThreads.map((thread) => {
                    return <ThreadOverview key={thread.id} thread={thread} />
                })}
            </div>
        </div>
    )
}
