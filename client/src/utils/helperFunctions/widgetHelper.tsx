import SuggestionsWidget from '../../components/DashboardFeature/SuggestionsWidget/SuggestionsWidget'
import MyThreadsWidget from '../../components/DashboardFeature/MyThreadsWidget/MyThreadsWidget'
import MostLikedThreadsWidget from '../../components/DashboardFeature/MostLikedThreadsWidget/MostLikedThreadsWidget'

export const widgetArray = ['Suggestions', 'My Threads', 'Most Liked Threads']

export const displayWidget = (widget) => {
    if (widget === 'Suggestions') {
        return <SuggestionsWidget />
    } else if (widget === 'My Threads') {
        return <MyThreadsWidget />
    } else if (widget === 'Most Liked Threads') {
        return <MostLikedThreadsWidget />
    }
}
