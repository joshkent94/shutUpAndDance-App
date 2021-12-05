import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../../../utils/state/forumSlice';
import { selectFirstName } from '../../../utils/state/userSlice';
import { showMessage } from "../../../utils/helperFunctions/showMessage";
import './NewThread.css';

export default function NewThread() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const firstName = useSelector(selectFirstName);
    const navigate = useNavigate();

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleCommentChange = e => {
        e.preventDefault();
        setComment(e.target.value);
    };

    const handleNewThread = e => {
        e.preventDefault();
        if (title === '' || comment === '') {
            showMessage(`Please make sure you enter a title and a comment.`)
        } else {
            dispatch(createThread({
                title: title,
                comment: comment
            }))
                .unwrap()
                .then(thread => {
                    navigate(`../${thread.id}`);
                });
        };
    };

    const handleCancel = () => {
        navigate("..");
    };

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
            </div>

            <form onSubmit={handleNewThread} id="new-thread">
                <div className="account-form-element thread-block">
                    <input className="account-input form-control thread-input" type="text" id="thread-title" placeholder="Title..." onChange={handleTitleChange} />
                </div>
                <div className="account-form-element thread-block">
                    <textarea className="account-input form-control thread-input" id="thread-comment" placeholder="What's on your mind..." onChange={handleCommentChange} />
                </div>
                <div>
                    <button className="account-submit btn" id="cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="account-submit btn" id="add-thread" type="submit">
                        Create Thread
                    </button>
                </div>
            </form>
        </div>
    );
};