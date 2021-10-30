import { useDispatch, useSelector } from "react-redux";
import { selectFirstName } from "../../utils/state/userSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getComments, getThread, selectComments, selectThreadInfo } from "../../utils/state/forumSlice";

export default function ThreadExpanded() {
    const firstName = useSelector(selectFirstName);
    const threadInfo = useSelector(selectThreadInfo);
    const comments = useSelector(selectComments);
    const { threadId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getThread(threadId));
        dispatch(getComments(threadId));
    }, [threadId, dispatch]);

    return (
        <div id="forum">
            <div className="heading">
                <h3>{firstName}'s Forum</h3>
            </div>

            <div>
                {threadInfo.title}
                {threadInfo.initial_comment}
                {`${threadInfo.first_name} ${threadInfo.last_name}`}
                {threadInfo.likes}
            </div>
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