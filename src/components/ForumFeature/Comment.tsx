import { useSelector } from 'react-redux'
import { likeCommentToggle } from '@utils/state/forumSlice'
import { selectUserId } from '@utils/state/userSlice'
import { useAppDispatch } from '@utils/state/store'

export default function Comment({ comment }) {
    const userId = useSelector(selectUserId)
    const dispatch = useAppDispatch()

    // toggle between like and dislike
    const likeToggle = () => {
        dispatch(
            likeCommentToggle({
                commentId: comment.id,
            })
        )
    }

    let likeIcon
    if (comment.likes.includes(userId)) {
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

    const commentDate = new Date(comment.timestamp)

    return (
        <div className="content-container comment">
            <div className="thread-container comment-text">
                <p>{comment.comment}</p>
            </div>
            <div className="thread-container">
                <p>
                    <span className="thread-label">Commented by:</span>{' '}
                    {comment.firstName} {comment.lastName}
                </p>
                <p>
                    <span className="thread-label">Commented on:</span>{' '}
                    {commentDate.toLocaleString('default', { month: 'short' })}{' '}
                    {commentDate.getUTCDate()} {commentDate.getUTCFullYear()}
                </p>
                <p>
                    <span className="thread-label">Likes:</span>{' '}
                    {comment.likes.length}
                </p>
                <div className="icon-section">{likeIcon}</div>
            </div>
        </div>
    )
}
