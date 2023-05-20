import Link from 'next/link'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
    getMostLikedThreads,
    getThreadsByUserId,
    likeThreadToggle,
    selectThreads,
} from '@utils/state/forumSlice'
import { selectUserId } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function ThreadOverview(props) {
    const thread = props.thread
    const threadId = thread.id
    const dispatch = useAppDispatch()
    const userId = useSelector(selectUserId)
    const threads = useSelector(selectThreads)
    const faBookOpenProp = faBookOpen as IconProp

    // toggle between like and dislike
    const likeToggle = () => {
        if (threads.length !== 0) {
            dispatch(
                likeThreadToggle({
                    threadId,
                    method: 'threadOverviews',
                })
            )
                .unwrap()
                .then(() => {
                    dispatch(getThreadsByUserId())
                    dispatch(getMostLikedThreads())
                })
        } else {
            dispatch(
                likeThreadToggle({
                    threadId,
                    method: 'mostLiked',
                })
            )
                .unwrap()
                .then(() => {
                    dispatch(getThreadsByUserId())
                    dispatch(getMostLikedThreads())
                })
        }
    }

    // display correct like icon based on current redux state
    let likeIcon
    if (thread.likes.includes(userId)) {
        likeIcon = (
            <button
                className="border-none bg-none align-middle text-[1.3rem] text-primary"
                onClick={likeToggle}
            >
                <i className="bi bi-hand-thumbs-up-fill"></i>
            </button>
        )
    } else {
        likeIcon = (
            <button
                className="border-none bg-none align-middle text-[1.3rem] text-primary"
                onClick={likeToggle}
            >
                <i className="bi bi-hand-thumbs-up"></i>
            </button>
        )
    }

    // convert thread timestamp to new date object
    const threadDate = new Date(thread.timestamp)

    return (
        <div className="thread mb-[0.7rem] flex h-[160px] w-full items-center rounded-[0.2rem] border border-third bg-secondary p-2 text-primary">
            <div className="thread-container my-2 flex h-[90%] min-h-[90%] w-1/2 flex-col justify-center border-r border-r-third px-[0.8rem] md:w-3/5 lg:w-4/5">
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap pb-2 text-[1.2rem] font-bold">
                    {thread.title}
                </p>
                <p className="m-0 line-clamp-3">{thread.initialComment}</p>
            </div>
            <div className="thread-container flex h-[90%] w-1/2 flex-col justify-center px-[0.8rem] md:w-2/5 lg:w-1/5">
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-bold">Created by:</span>{' '}
                    {thread.firstName} {thread.lastName}
                </p>
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-bold">Created on:</span>{' '}
                    {threadDate.toLocaleString('default', { month: 'short' })}{' '}
                    {threadDate.getUTCDate()} {threadDate.getUTCFullYear()}
                </p>
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-bold">Likes:</span>{' '}
                    {thread.likes.length}
                </p>
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-bold">Comments:</span>{' '}
                    {thread.numberOfComments}
                </p>
                <div className="flex items-center justify-evenly pt-[0.2rem]">
                    {likeIcon}
                    <Link href={`/forum/${threadId}`}>
                        <FontAwesomeIcon
                            icon={faBookOpenProp}
                            className="border-none bg-none align-middle text-[1.3rem] text-primary"
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}
