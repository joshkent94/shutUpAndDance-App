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

    const commentDate = new Date(comment.timestamp)

    return (
        <div className="comment mb-[0.7rem] flex h-fit w-full items-center rounded-[0.2rem] border border-third bg-secondary p-2">
            <div className="my-2 flex h-[90%] min-h-[90%] w-1/2 flex-col justify-center border-r border-r-third px-[0.8rem] md:w-3/5 lg:w-4/5">
                <p className="m-0">{comment.comment}</p>
            </div>
            <div className="flex h-[90%] w-1/2 flex-col justify-center px-[0.8rem] md:w-2/5 lg:w-1/5">
                <p className="m-0">
                    <span className="font-bold">Commented by:</span>{' '}
                    {comment.firstName} {comment.lastName}
                </p>
                <p className="m-0">
                    <span className="font-bold">Commented on:</span>{' '}
                    {commentDate.toLocaleString('default', { month: 'short' })}{' '}
                    {commentDate.getUTCDate()} {commentDate.getUTCFullYear()}
                </p>
                <p className="m-0">
                    <span className="font-bold">Likes:</span>{' '}
                    {comment.likes.length}
                </p>
                <div className="flex items-center justify-evenly pt-[0.2rem]">
                    {likeIcon}
                </div>
            </div>
        </div>
    )
}
