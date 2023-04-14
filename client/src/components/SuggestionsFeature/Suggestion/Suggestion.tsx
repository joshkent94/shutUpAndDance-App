import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPlayingSong,
    selectAccessToken,
    selectCurrentlyPlaying,
    selectRefreshToken,
    togglePlay
} from '../../../utils/state/spotifySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import './Suggestion.scss';

export default function Suggestion({ track }) {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const refreshToken = useSelector(selectRefreshToken);
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const [paused] = useState(!(track.uri === currentlyPlaying.uri && currentlyPlaying.isPlaying));
    const faPlayProp = faPlay as IconProp;
    const faPauseProp = faPause as IconProp;

    // toggle play and update currently playing
    const togglePlayState = () => {
        dispatch(
            togglePlay({
                paused: paused,
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
                uri: track.uri
            })
        )
            .unwrap()
            .then(() => {
                dispatch(
                    getPlayingSong({
                        accessToken,
                        refreshToken
                    })
                );
            });
    };

    let playButton;
    if (currentlyPlaying.device) {
        if (!paused) {
            playButton = (
                <button className="action-button" onClick={togglePlayState}>
                    <FontAwesomeIcon icon={faPauseProp} />
                </button>
            );
        } else {
            playButton = (
                <button className="action-button" onClick={togglePlayState}>
                    <FontAwesomeIcon icon={faPlayProp} />
                </button>
            );
        }
    }

    return (
        <div className="content-container track animate__animated animate__fadeIn">
            <div className="album-image-container">
                <img src={track.images[1].url} alt={track.name} className="track-image" />
            </div>
            <div className="track-details">
                <p className="track-info track-title">{track.name}</p>
                <p className="track-info sub-info">
                    {track.artist} || {track.album}
                </p>
            </div>
            <div className="actions-container">{playButton}</div>
        </div>
    );
}
