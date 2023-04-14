import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';
import { getMostLikedThreads, getThreadsByUserId, likeThreadToggle, selectThreads } from "../../../utils/state/forumSlice";
import { selectUserId } from '../../../utils/state/userSlice';
import { useAppDispatch } from '../../../utils/state/store';
import './ThreadOverview.scss';

export default function ThreadOverview(props) {
    const thread = props.thread;
    const threadId = thread.id;
    const dispatch = useAppDispatch();
    const userId = useSelector(selectUserId);
    const threads = useSelector(selectThreads);
    const faBookOpenProp = faBookOpen as IconProp;

    // toggle between like and dislike
    const likeToggle = () => {
        if (threads.length !== 0) {
            dispatch(likeThreadToggle({
                threadId,
                method: 'threadOverviews'
            }))
                .unwrap()
                .then(() => {
                    dispatch(getThreadsByUserId());
                    dispatch(getMostLikedThreads());
                });
        } else {
            dispatch(likeThreadToggle({
                threadId,
                method: 'mostLiked'
            }))
                .unwrap()
                .then(() => {
                    dispatch(getThreadsByUserId());
                    dispatch(getMostLikedThreads());
                });
        };
    };

    // display correct like icon based on current redux state
    let likeIcon;
    if (thread.likes.includes(userId)) {
        likeIcon = <button className="browse-threads-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up-fill"></i></button>;
    } else {
        likeIcon = <button className="browse-threads-icon" onClick={likeToggle}><i className="bi bi-hand-thumbs-up"></i></button>;
    };

    // convert thread timestamp to new date object
    const threadDate = new Date(thread.timestamp);

    return (
        <div className="content-container thread animate__animated animate__fadeIn">
            <div className="thread-container">
                <p className='thread-title'>{thread.title}</p>
                <p className='thread-initial-comment'>{thread.initialComment}</p>
            </div>
            <div className="thread-container thread-sub-info">
                <p><span className='thread-label'>Created by:</span> {thread.firstName} {thread.lastName}</p>
                <p><span className='thread-label'>Created on:</span> {threadDate.toLocaleString('default', { month: 'short' })} {threadDate.getUTCDate()} {threadDate.getUTCFullYear()}</p>
                <p><span className='thread-label'>Likes:</span> {thread.likes.length}</p>
                <p><span className='thread-label'>Comments:</span> {thread.numberOfComments}</p>
                <div className='icon-section'>
                    {likeIcon}
                    <Link to={`/forum/${threadId}`}><FontAwesomeIcon icon={faBookOpenProp} className='browse-threads-icon' /></Link>
                </div>
            </div>
        </div>
    );
};