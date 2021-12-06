import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../utils/state/userSlice";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addComment, getComments, getThread, likeThreadToggle, selectComments, selectThreadInfo } from "../../../utils/state/forumSlice";
import './ThreadExpanded.css';

export default function ThreadExpanded() {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
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
        likeIcon = <button className="like-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up-fill"></i></button>
    } else {
        likeIcon = <button className="like-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up"></i></button>
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
        <div id="forum" className='main'>
            <div id="thread-heading">
                <div id="thread-info">
                    <h4>{threadInfo.title}</h4>
                    {threadInfo.initial_comment}
                    <p className="posted-by">Posted by {threadInfo.first_name} {threadInfo.last_name}</p>
                </div>
                <div id="like-info">
                    {likeIcon}
                    {threadInfo.likes.length}
                </div>
            </div>
            <form onSubmit={postComment}>
                <textarea className="account-input form-control thread-input" id="thread-comment" placeholder="What's on your mind..." onChange={handleCommentChange} required></textarea>
                <button type="submit" id="submit-comment"><i className="bi bi-send"></i></button>
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