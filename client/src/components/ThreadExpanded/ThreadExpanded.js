import { useDispatch, useSelector } from "react-redux";
import { selectFirstName, selectUserId } from "../../utils/state/userSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addComment, getComments, getThread, likeThreadToggle, selectComments, selectThreadInfo } from "../../utils/state/forumSlice";

export default function ThreadExpanded() {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const firstName = useSelector(selectFirstName);
    const threadInfo = useSelector(selectThreadInfo);
    const comments = useSelector(selectComments);
    const { threadId } = useParams();
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        dispatch(getThread(threadId));
        dispatch(getComments(threadId));
    }, [threadId, dispatch]);

    const likeToggle = () => {
        dispatch(likeThreadToggle({
            threadId
        }));
    };

    let likeIcon;
    if (threadInfo.likes.includes(userId)) {
        likeIcon = <button onClick={likeToggle}><i className="bi bi-hand-thumbs-up-fill"></i></button>
    } else {
        likeIcon = <button onClick={likeToggle}><i className="bi bi-hand-thumbs-up"></i></button>
    }

    const handleCommentChange = e => {
        e.preventDefault();
        setNewComment(e.target.value);
    };

    const postComment = e => {
        e.preventDefault();
        dispatch(addComment({
            threadId,
            comment: newComment
        }))
            .unwrap()
            .then(() => {
                setNewComment('');
                dispatch(getComments(threadId));
            });
    };

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
            </div>

            <div>
                {threadInfo.title}
                {threadInfo.initial_comment}
                {`${threadInfo.first_name} ${threadInfo.last_name}`}
                {likeIcon}
                {threadInfo.likes.length}
            </div>
            <form onSubmit={postComment}>
                <input type="text" value={newComment} onChange={handleCommentChange}></input>
                <button type="submit">Post Comment</button>
            </form>
            <div>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            {comment.comment}
                            {`${comment.first_name} ${comment.last_name}`}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};