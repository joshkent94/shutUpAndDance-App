import './Suggestion.css';

export default function Suggestion(props) {
    const track = props.track;

    return (
        <div className="track animate__animated animate__fadeIn">
            <img src={track.images[2].url} alt={track.name} className="track-image" />
            <div className="track-details">
                <p className="track-info track-title">
                    {track.name}
                </p>
                <p className="track-info sub-info">
                    {track.artist} || {track.album}
                </p>
            </div>
        </div>
    );
};