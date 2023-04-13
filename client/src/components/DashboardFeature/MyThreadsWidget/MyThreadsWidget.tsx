import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThreadsByUserId, selectUserThreads } from "../../../utils/state/forumSlice";
import ThreadOverview from "../../ForumFeature/ThreadOverview/ThreadOverview";

export default function MyThreadsWidget() {
    const dispatch = useDispatch();
    const userThreads = useSelector(selectUserThreads);

    // get most liked threads on load if state is empty
    useEffect(() => {
        if (userThreads.length === 0 && document.cookie) {
            dispatch(getThreadsByUserId());
        };
    });

    return (
        <div>
            <div className="content-container widget animate__animated animate__fadeIn">
                <h5 className="sub-heading content-container">
                    My Threads
                </h5>
                <div className="widget-content">
                    {userThreads.map(thread => {
                        return <ThreadOverview key={thread.id} thread={thread} />
                    })}
                </div>
            </div>
        </div>
    );
};