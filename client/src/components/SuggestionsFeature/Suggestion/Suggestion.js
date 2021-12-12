import './Suggestion.css';

export default function Suggestion(props) {
    const track = props.track;

    return (
        <div className="content-container track animate__animated animate__fadeIn">
            <div className='album-image-container'>
                <img src={track.images[1].url} alt={track.name} className="track-image" />
            </div>
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