import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../../utils/state/userSlice";
import { addComment, getComments, getThread, likeThreadToggle, selectThreadInfo } from "../../../utils/state/forumSlice";
import Comment from "../Comment/Comment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { showMessage } from "../../../utils/helperFunctions/showMessage";
import './ThreadExpanded.css';

export default function ThreadExpanded() {
    const dispatch = useDispatch();
    const userId = useSelector(selectUserId);
    const threadInfo = useSelector(selectThreadInfo);
    const comments = threadInfo.comments;
    const { threadId } = useParams();
    const [newComment, setNewComment] = useState('');

    // get all the details for the thread on page load
    useEffect(() => {
        dispatch(getThread(threadId))
            .unwrap()
            .then(() => {
                dispatch(getComments(threadId));
            });
    }, [threadId, dispatch]);

    // toggle between like and not like
    const likeToggle = () => {
        dispatch(likeThreadToggle({
            threadId,
            method: 'threadInfo'
        }));
    };

    const handleCommentChange = e => {
        e.preventDefault();
        setNewComment(e.target.value);
    };

    // send new comment to the back end
    // then fetch all the latest comments and reload UI
    const postComment = e => {
        e.preventDefault();
        if (newComment !== '') {
            dispatch(addComment({
                threadId,
                comment: newComment
            }))
                .unwrap()
                .then(() => {
                    setNewComment('');
                    dispatch(getComments(threadId));
                });
        } else {
            showMessage('Comment can not be blank');
        };
    };

    // display correct like icon based on current redux state
    let likeIcon;
    if (threadInfo.likes.includes(userId)) {
        likeIcon = <button className="browse-threads-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up-fill"></i></button>;
    } else {
        likeIcon = <button className="browse-threads-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up"></i></button>;
    };

    // convert thread timestamp to new date object
    const threadDate = new Date(threadInfo.timestamp);

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    <Link to="/forum">Forum</Link> {'>'} Thread
                </h5>
            </div>
            <div className="page-content">
                <div id="thread-expanded-page">
                    <div id="thread-heading" className="content-container animate__animated animate__fadeIn">
                        <div id="thread-heading-text" className="thread-container">
                            <p id='thread-title-text'>{threadInfo.title}</p>
                            <p>{threadInfo.initialComment}</p>
                        </div>
                        <div className="thread-container">
                            <p><span className="thread-label">Created by:</span> {threadInfo.firstName} {threadInfo.lastName}</p>
                            <p><span className='thread-label'>Created on:</span> {threadDate.toLocaleString('default', { month: 'short' })} {threadDate.getUTCDate()} {threadDate.getUTCFullYear()}</p>
                            <p><span className='thread-label'>Likes:</span> {threadInfo.likes.length}</p>
                            <p><span className='thread-label'>Comments:</span> {comments.length}</p>
                            <div className='icon-section'>
                                {likeIcon}
                            </div>
                        </div>
                    </div>
                    <div id="add-new-comment" className="input-group animate__animated animate__fadeIn">
                        <textarea id="add-new-comment-textarea" className="form-control" placeholder="Add a comment..." onChange={handleCommentChange} value={newComment} rows={2} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="submit" id="submit-comment" onClick={postComment}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </div>
                    </div>
                    {comments.slice().reverse().map(comment => <Comment key={comment.id} comment={comment} />)}
                </div>
            </div>
        </div>
    );
};