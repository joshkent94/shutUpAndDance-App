import SuggestionsWidget from '../../components/DashboardFeature/SuggestionsWidget/SuggestionsWidget';
import MyThreadsWidget from '../../components/DashboardFeature/MyThreadsWidget/MyThreadsWidget';
import MostLikedThreadsWidget from '../../components/DashboardFeature/MostLikedThreadsWidget/MostLikedThreadsWidget';

export const widgetArray = [
    {
        name: 'Suggestions',
        component: <SuggestionsWidget />
    },
    {
        name: 'My Threads',
        component: <MyThreadsWidget />
    },
    {
        name: 'Most Liked Threads',
        component: <MostLikedThreadsWidget />
    }
];