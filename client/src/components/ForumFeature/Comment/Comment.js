import './Comment.css';

export default function Comment({ comment }) {
    // let likeIcon;
    
    const commentDate = new Date(comment.timestamp);
    
    return (
        <div className="content-container comment animate__animated animate__fadeIn">
            <div className="thread-container comment-text">
                <p>{comment.comment}</p>
            </div>
            <div className="thread-container">
                <p><span className="thread-label">Commented by:</span> {comment.firstName} {comment.lastName}</p>
                <p><span className='thread-label'>Commented on:</span> {commentDate.toLocaleString('default', { month: 'short' })} {commentDate.getUTCDate()} {commentDate.getUTCFullYear()}</p>
                {/* <p><span className='thread-label'>Likes:</span> {threadInfo.likes.length}</p> */}
                {/* <div className='icon-section'>
                    {likeIcon}
                </div> */}
            </div>
        </div>
    );
};