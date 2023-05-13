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
        <div className="widget flex h-full w-full flex-col rounded-[0.2rem] border border-third bg-fifth bg-none p-2">
            <h5 className="widget-title m-auto mb-2 w-full rounded-[0.2rem] border border-third bg-secondary p-2 text-[1.1rem] font-semibold">
                My Threads
            </h5>
            <div className="flex grow flex-col overflow-y-auto">
                {userThreads.map((thread) => {
                    return <ThreadOverview key={thread.id} thread={thread} />
                })}
            </div>
        </div>
    )
}
