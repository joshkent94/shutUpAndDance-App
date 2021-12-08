import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMostLikedThreads, selectMostLiked } from '../../utils/state/forumSlice';
import SongSuggestions from '../SuggestionsFeature/SongSuggestions/SongSuggestions';
import ThreadOverview from '../ForumFeature/ThreadOverview/ThreadOverview';
import './Dashboard.css';

export default function Dashboard() {
    const dispatch = useDispatch();
    const mostLiked = useSelector(selectMostLiked);

    useEffect(() => {
        if (mostLiked.length === 0) {
            dispatch(getMostLikedThreads());
        };
    }, [dispatch, mostLiked.length]);

    return (
        <div id="dashboard">
            <div>
                <div>
                    <h4>We suggest you listen to:</h4>
                    <SongSuggestions />
                </div>
                <div>
                    <h4>Most liked threads are:</h4>
                    {mostLiked.map(thread => {
                        return <ThreadOverview key={thread.id} thread={thread} />
                    })}
                </div>
            </div>
        </div>
    );
};