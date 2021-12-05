import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMostLikedThreads, selectMostLiked } from '../../utils/state/forumSlice';
import { selectFirstName } from '../../utils/state/userSlice';
import SongSuggestions from '../SuggestionsFeature/SongSuggestions/SongSuggestions';
import ThreadOverview from '../ForumFeature/ThreadOverview/ThreadOverview';
import './Dashboard.css';

export default function Dashboard() {
    const dispatch = useDispatch();
    const firstName = useSelector(selectFirstName);
    const mostLiked = useSelector(selectMostLiked);

    useEffect(() => {
        if (mostLiked.length === 0) {
            dispatch(getMostLikedThreads());
        };
    }, [dispatch, mostLiked.length]);

    return (
        <div id="dashboard">
            <div className="heading">
                <h3>{firstName}'s Dashboard</h3>
            </div>
            <div className="content">
                <div className="dashboard-widget">
                    <h4>We suggest you listen to:</h4>
                    <SongSuggestions />
                </div>
                <div className="dashboard-widget">
                    <h4>Most liked threads are:</h4>
                    {mostLiked.map(thread => {
                        return <ThreadOverview key={thread.id} thread={thread} />
                    })}
                </div>
            </div>
        </div>
    );
};