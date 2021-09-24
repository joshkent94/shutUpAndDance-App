import { useSelector } from "react-redux";
import { selectRecommendations } from "../../utils/state/musicSlice";
import Recommendation from "../Recommendation/Recommendation";
import Subnav from "../Subnav/Subnav";
import './Recommendations.css';

export default function Recommendations() {
    const recommendations = useSelector(selectRecommendations);

    let content;
    if (recommendations.length === 0) {
        content =
            <div id="recommendations">
                <Subnav />
                <div className="content">
                    <div>
                        Select genres to see recommendations.
                    </div>
                </div>
            </div>;
    } else {
        content =
            <div id="recommendations">
                <Subnav />
                <div className="content">
                    {recommendations.map(track => {
                        return <Recommendation key={track.id} track={track} />
                    })}
                </div>
            </div>;
    };

    return (
        content
    );
};