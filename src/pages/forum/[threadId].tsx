import TopNav from '@components/Layout/TopNav'
import MusicPlayer from '@components/MusicPlayerFeature/MusicPlayer'
import Footer from '@components/Layout/Footer'
import { useRouter } from 'next/router'
import sessionOptions from '@utils/helperFunctions/sessionOptions'
import authCheck from '@utils/helperFunctions/authCheck'
import { withIronSessionSsr } from 'iron-session/next'
import { useEffect, useLayoutEffect, useState } from 'react'
import { logout, selectUserId } from '@utils/state/userSlice'
import { resetSpotifyDetails } from '@utils/state/spotifySlice'
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
    resetForumDetails,
} from '@utils/state/forumSlice'
import { showMessage } from '@utils/helperFunctions/showMessage'
import { useAppDispatch } from '@utils/state/store'
import Comment from '@components/ForumFeature/Comment'
import Head from 'next/head'

export default function ThreadPage({ user }) {
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
            showMessage('Comment can not be blank')
        }
    }

    // display correct like icon based on current redux state
    let likeIcon
    if (threadInfo.likes.includes(userId)) {
        likeIcon = (
            <button className="browse-threads-icon" onClick={likeToggle}>
                <i className="bi bi-hand-thumbs-up-fill"></i>
            </button>
        )
    } else {
        likeIcon = (
            <button className="browse-threads-icon" onClick={likeToggle}>
                <i className="bi bi-hand-thumbs-up"></i>
            </button>
        )
    }

    // convert thread timestamp to new date object
    const threadDate = new Date(threadInfo.timestamp)

    useLayoutEffect(() => {
        if (!user.isLoggedIn) {
            dispatch(logout()).then(() => {
                dispatch(resetForumDetails())
                dispatch(resetSpotifyDetails())
            })
        }
    })

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
            <div className="main">
                <div className="page">
                    <div className="page-header">
                        <h5 className="page-header-h5">
                            <Link href="/forum">Forum</Link> {'>'} Thread
                        </h5>
                    </div>
                    <div className="page-content">
                        <div id="thread-expanded-page">
                            <div
                                id="thread-heading"
                                className="content-container"
                            >
                                <div
                                    id="thread-heading-text"
                                    className="thread-container"
                                >
                                    <p id="thread-title-text">
                                        {threadInfo.title}
                                    </p>
                                    <p>{threadInfo.initialComment}</p>
                                </div>
                                <div className="thread-container">
                                    <p>
                                        <span className="thread-label">
                                            Created by:
                                        </span>{' '}
                                        {threadInfo.firstName}{' '}
                                        {threadInfo.lastName}
                                    </p>
                                    <p>
                                        <span className="thread-label">
                                            Created on:
                                        </span>{' '}
                                        {threadDate.toLocaleString('default', {
                                            month: 'short',
                                        })}{' '}
                                        {threadDate.getUTCDate()}{' '}
                                        {threadDate.getUTCFullYear()}
                                    </p>
                                    <p>
                                        <span className="thread-label">
                                            Likes:
                                        </span>{' '}
                                        {threadInfo.likes.length}
                                    </p>
                                    <p>
                                        <span className="thread-label">
                                            Comments:
                                        </span>{' '}
                                        {comments.length}
                                    </p>
                                    <div className="icon-section">
                                        {likeIcon}
                                    </div>
                                </div>
                            </div>
                            <div id="add-new-comment" className="input-group">
                                <textarea
                                    id="add-new-comment-textarea"
                                    className="form-control"
                                    placeholder="Add a comment..."
                                    onChange={handleCommentChange}
                                    value={newComment}
                                    rows={2}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="submit"
                                        id="submit-comment"
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
