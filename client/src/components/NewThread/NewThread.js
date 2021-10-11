import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createThread } from '../../utils/state/forumSlice';
import './NewThread.css';
import { useHistory } from 'react-router-dom';
import { showMessage } from "../../utils/helperFunctions/showMessage";
import { selectFirstName } from '../../utils/state/userSlice';

export default function NewThread() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const history = useHistory();
    const firstName = useSelector(selectFirstName);

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
            }));
            history.push('/forum');
        };
    };

    const handleCancel = () => {
        history.push('/forum');
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
                        Add Thread
                    </button>
                </div>
            </form>
        </div>
    );
};