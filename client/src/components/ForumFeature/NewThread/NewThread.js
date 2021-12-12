import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createThread } from '../../../utils/state/forumSlice';
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

    const handleNewThread = e => {
        e.preventDefault();
        dispatch(createThread({
            title: title,
            comment: comment
        }))
            .unwrap()
            .then(thread => {
                navigate(`../browse/${thread.id}`);
            });
    };

    return (
        <div className="page">
            <div className="page-header">
                <h5 className="page-header-h5">
                    Create New Thread
                </h5>
            </div>
            <div className="page-content">
                <div id="new-thread-page" className='content-container'>
                    <h6 id="new-thread-heading" className="sub-heading">
                        Share your passion for music by creating a new thread:
                    </h6>
                    <form id="new-thread-form" onSubmit={handleNewThread}>
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
            </div>
        </div>
    );
};