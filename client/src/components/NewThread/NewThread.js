import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createThread } from '../../utils/state/forumSlice';
import './NewThread.css';
import { useHistory } from 'react-router-dom';

export default function NewThread() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const history = useHistory();

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
        dispatch(createThread({
            title: title,
            comment: comment
        }));
        history.push('/forum');
    };

    return (
        <form onSubmit={handleNewThread} id="new-thread">
            <div className="account-form-element thread-block">
                <input className="account-input form-control thread-input" type="text" id="thread-title" placeholder="Title..." required onChange={handleTitleChange} />
            </div>
            <div className="account-form-element thread-block">
                <textarea className="account-input form-control thread-input" id="thread-comment" placeholder="What's on your mind..." required onChange={handleCommentChange} />
            </div>
            <button className="account-submit btn" type="submit">
                Add Thread
            </button>
        </form>
    );
};