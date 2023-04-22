import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
    getThreadsByUserId,
    selectUserThreads,
} from '../../../utils/state/forumSlice'
import ThreadOverview from '../ThreadOverview/ThreadOverview'
import { useAppDispatch } from '../../../utils/state/store'
import './MyThreads.scss'

export default function MyThreads({ searchTerm }) {
    const dispatch = useAppDispatch()
    const userThreads = useSelector(selectUserThreads)
    const firstRender = useRef(true)

    // get user's threads on first load
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false
            dispatch(getThreadsByUserId())
        }
    })

    let content
    if (searchTerm) {
        content = userThreads
            .filter((thread) => {
                return thread.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            })
            .map((thread) => {
                return <ThreadOverview key={thread.id} thread={thread} />
            })
    } else {
        content = userThreads.map((thread) => {
            return <ThreadOverview key={thread.id} thread={thread} />
        })
    }

    return <div id="my-threads-page">{content}</div>
}
