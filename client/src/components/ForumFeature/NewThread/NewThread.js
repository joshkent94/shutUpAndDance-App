import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread, getThreadsByUserId } from '../../../utils/state/forumSlice';
import './NewThread.css';

export default function NewThread() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleCommentChange = e => {
        e.preventDefault();
        setComment(e.target.value);
    };

    // create thread, then update user's threads in state
    // and navigate to the newly created thread
    const handleNewThread = e => {
        e.preventDefault();
        dispatch(createThread({
            title: title,
            comment: comment
        }))
            .unwrap()
            .then(thread => {
                dispatch(getThreadsByUserId());
                navigate(`${thread.id}`);
            });
    };

    return (
        <div id="new-thread-page">
            <form id="new-thread-form" className='content-container animate__animated animate__fadeIn' onSubmit={handleNewThread}>
                <label className="form-element">
                    Title
                    <input className="form-control sign-up-element new-thread-element" type="text" id="thread-title" placeholder="Title" onChange={handleTitleChange} required />
                </label>
                <label className="form-element">
                    Comment
                    <textarea className="form-control sign-up-element new-thread-element" id="thread-comment" placeholder="What's on your mind..." onChange={handleCommentChange} required />
                </label>

                <button className="coolBeans" id="create-thread-button" type="submit">
                    Create Thread
                </button>
            </form>
        </div>
    );
};