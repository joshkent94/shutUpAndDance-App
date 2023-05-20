import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import { useRouter } from 'next/router'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useEffect, useState } from 'react'
import { selectUserId } from '@utils/state/userSlice'
import Pendo from '@components/Layout/Pendo'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import {
    addComment,
    getComments,
    getThread,
    likeThreadToggle,
    selectThreadInfo,
} from '@utils/state/forumSlice'
import { showMessage } from '@utils/helperFunctions/showMessage'
import { useAppDispatch } from '@utils/state/store'
import Comment from '@components/ForumFeature/Comment'
import Head from 'next/head'

export default function ThreadPage() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const threadId = router.query.threadId
    const userId = useSelector(selectUserId)
    const threadInfo = useSelector(selectThreadInfo)
    const comments = threadInfo.comments
    const [newComment, setNewComment] = useState('')
    const faPaperPlaneProp = faPaperPlane as IconProp

    // get all the details for the thread on page load
    useEffect(() => {
        if (threadId && typeof threadId === 'string') {
            dispatch(getThread(threadId))
                .unwrap()
                .then(() => {
                    dispatch(getComments(threadId))
                })
        }
    }, [threadId, dispatch])

    // toggle between like and not like
    const likeToggle = () => {
        if (threadId && typeof threadId === 'string') {
            dispatch(
                likeThreadToggle({
                    threadId,
                    method: 'threadInfo',
                })
            )
        }
    }

    const handleCommentChange = (e) => {
        e.preventDefault()
        setNewComment(e.target.value)
    }

    // send new comment to the back end
    // then fetch all the latest comments and reload UI
    const postComment = (e) => {
        e.preventDefault()
        if (newComment !== '' && threadId && typeof threadId === 'string') {
            dispatch(
                addComment({
                    threadId,
                    comment: newComment,
                })
            )
                .unwrap()
                .then(() => {
                    setNewComment('')
                    dispatch(getComments(threadId))
                })
        } else {
            showMessage('Comment cannot be blank')
        }
    }

    // display correct like icon based on current redux state
    let likeIcon
    if (threadInfo.likes.includes(userId)) {
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
    const threadDate = new Date(threadInfo.timestamp)

    return (
        <>
            <Head>
                <title>{threadInfo.title}</title>
                <meta
                    name="description"
                    content="Chat with other like minded music lovers in dedicated forum threads."
                    key="desc"
                />
            </Head>
            <Pendo />
            <TopNav />
            <div className="flex min-h-screen w-full flex-col bg-fifth pt-[3.925rem]">
                <div className="flex grow flex-col px-8 py-4">
                    <div className="flex h-[50px] items-center justify-between border-b border-b-third px-4 pb-4">
                        <h5 className="m-0 text-[1.3rem] font-semibold leading-normal">
                            <Link
                                href="/forum"
                                className="text-primary hover:text-fourth"
                            >
                                Forum
                            </Link>{' '}
                            {'>'} Thread
                        </h5>
                    </div>
                    <div className="flex grow flex-col">
                        <div className="mt-4 flex grow flex-col items-center">
                            <div className="mb-[0.7rem] flex h-fit min-h-[150px] w-full items-center rounded-[0.2rem] border border-third bg-secondary p-2">
                                <div className="my-2 flex h-[90%] min-h-[90%] w-1/2 flex-col justify-center border-r border-r-third px-[0.8rem] md:w-3/5 lg:w-4/5">
                                    <p className="m-0 pb-2 text-[1.2rem] font-bold">
                                        {threadInfo.title}
                                    </p>
                                    <p className="m-0">
                                        {threadInfo.initialComment}
                                    </p>
                                </div>
                                <div className="flex h-[90%] w-1/2 flex-col justify-center px-[0.8rem] md:w-2/5 lg:w-1/5">
                                    <p className="m-0">
                                        <span className="font-bold">
                                            Created by:
                                        </span>{' '}
                                        {threadInfo.firstName}{' '}
                                        {threadInfo.lastName}
                                    </p>
                                    <p className="m-0">
                                        <span className="font-bold">
                                            Created on:
                                        </span>{' '}
                                        {threadDate.toLocaleString('default', {
                                            month: 'short',
                                        })}{' '}
                                        {threadDate.getUTCDate()}{' '}
                                        {threadDate.getUTCFullYear()}
                                    </p>
                                    <p className="m-0">
                                        <span className="font-bold">
                                            Likes:
                                        </span>{' '}
                                        {threadInfo.likes.length}
                                    </p>
                                    <p className="m-0">
                                        <span className="font-bold">
                                            Comments:
                                        </span>{' '}
                                        {comments.length}
                                    </p>
                                    <div className="flex items-center justify-evenly pt-[0.2rem]">
                                        {likeIcon}
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-8">
                                <textarea
                                    className="form-control rounded-[0.2rem] rounded-br-none rounded-tr-none placeholder:text-third focus:border-primary focus:shadow-none"
                                    placeholder="Add a comment..."
                                    onChange={handleCommentChange}
                                    value={newComment}
                                    rows={2}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary z-0 h-full rounded-[0.2rem] rounded-bl-none rounded-tl-none border border-third bg-secondary text-[1.2rem] text-primary focus:shadow-none"
                                        type="submit"
                                        onClick={postComment}
                                    >
                                        <FontAwesomeIcon
                                            icon={faPaperPlaneProp}
                                        />
                                    </button>
                                </div>
                            </div>
                            {comments
                                .slice()
                                .reverse()
                                .map((comment) => (
                                    <Comment
                                        key={comment.id}
                                        comment={comment}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <MusicPlayer />
                <Footer />
            </div>
        </>
    )
}

export const getServerSideProps = withIronSessionSsr(authCheck, sessionOptions)
