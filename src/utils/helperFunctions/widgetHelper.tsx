import SuggestionsWidget from '@components/DashboardFeature/Widgets/SuggestionsWidget'
import MyThreadsWidget from '@components/DashboardFeature/Widgets/MyThreadsWidget'
import MostLikedThreadsWidget from '@components/DashboardFeature/Widgets/MostLikedThreadsWidget'

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
