import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMostLikedThreads, selectMostLiked } from "../../../utils/state/forumSlice";
import ThreadOverview from "../../ForumFeature/ThreadOverview/ThreadOverview";
import './MostLikedThreadsWidget.scss';

export default function MostLikedThreadsWidget() {
    const dispatch = useDispatch();
    const mostLiked = useSelector(selectMostLiked);

    // get most liked threads on load if state is empty
    useEffect(() => {
        if (mostLiked.length === 0 && document.cookie) {
            dispatch(getMostLikedThreads());
        };
    });

    return (
        <div>
            <div className="content-container widget animate__animated animate__fadeIn">
                <h5 className="sub-heading content-container">
                    Most Liked Threads
                </h5>
                <div className="widget-content">
                    {mostLiked.map(thread => {
                        return <ThreadOverview key={thread.id} thread={thread} />
                    })}
                </div>
            </div>
        </div>
    );
};