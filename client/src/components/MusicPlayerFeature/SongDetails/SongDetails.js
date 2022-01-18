import './SongDetails.css';

export default function SongDetails({ currentlyPlaying }) {
    return (
        <div className='player-details animate__animated animate__fadeIn'>
            <div className='player-image-container'>
                <img src={currentlyPlaying.images[0].url} alt={currentlyPlaying.name} className='player-image' />
            </div>
            <div className='player-info-container'>
                <p className='player-track-name'>
                    {currentlyPlaying.name}
                </p>
                <p className='player-track-info'>
                    {currentlyPlaying.artist} || {currentlyPlaying.album}
                </p>
            </div>
        </div>
    );
};