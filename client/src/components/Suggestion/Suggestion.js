import './Suggestion.css';

export default function Suggestion(props) {
    const track = props.track;

    return (
        <div className="track">
            <img src={track.images[2].url} alt={track.name} />
            <h6 className="track-info">
                {track.name}
            </h6>
            <h6 className="track-info">
                {track.artist}
            </h6>
        </div>
    );
};