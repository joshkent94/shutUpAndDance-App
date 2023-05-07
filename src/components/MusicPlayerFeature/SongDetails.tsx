import Image from 'next/image'

export default function SongDetails({ currentlyPlaying }) {
    return (
        <div className="player-details">
            <div className="player-image-container">
                <Image
                    src={currentlyPlaying.images[0].url}
                    alt={currentlyPlaying.name}
                    className="player-image"
                    width={75}
                    height={75}
                />
            </div>
            <div className="player-info-container">
                <p className="player-track-name">{currentlyPlaying.name}</p>
                <p className="player-track-info">
                    {currentlyPlaying.artist} || {currentlyPlaying.album}
                </p>
            </div>
        </div>
    )
}
