import './ThreadOverview.css';

export default function ThreadOverview(props) {
    const thread = props.thread;

    return (
        <div className="thread animate__animated animate__fadeIn">
            <div className="thread-title">
                <p>{thread.title}</p>
            </div>
            <div className="thread-info">
                <div className="thread-info-left">
                    <p className="thread-sub-info">Created by {thread.first_name} {thread.last_name}</p>
                    <p className="thread-sub-info">Likes: {thread.likes}</p>
                </div>
                <p className="thread-initial-comment">
                    {thread.initial_comment}
                </p>
            </div>
        </div>
    );
};