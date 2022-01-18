import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import spotifyLogo from '../../assets/Spotify_Logo_RGB_Green.png';
import { getPlayingSong, selectAccessToken, selectCurrentlyPlaying } from '../../utils/state/spotifySlice';
import useSWR from 'swr';
import './MusicPlayer.css';

export default function MusicPlayer() {
    const dispatch = useDispatch();
    const accessToken = useSelector(selectAccessToken);
    const currentlyPlaying = useSelector(selectCurrentlyPlaying);
    const [show, setShow] = useState(false);

    // poll for currently playing song every 5 seconds if music player is showing
    useSWR(
        show ? accessToken : null,
        accessToken => dispatch(getPlayingSong(accessToken)),
        {
            refreshInterval: 5000,
            revalidateOnFocus: false
        }
    );

    // transition tab out and player in
    const showPlayer = () => {
        document.getElementsByClassName('player-toggle')[0].style.right = '-50px';
        setTimeout(() => {
            setShow(true);
        }, 200);
    };

    // transition player out and tab in
    const hidePlayer = () => {
        if (show) {
            setShow(false);
            setTimeout(() => {
                document.getElementsByClassName('player-toggle')[0].style.right = '0px';
            }, 300);
        };
    };

    let content;
    if (currentlyPlaying.name) {
        content =
            <Offcanvas.Body className='player-body'>
                <div className='player-details'>
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
                <div className='player-controls'>
                    Player controls
                </div>
            </Offcanvas.Body>;
    } else {
        content =
            <Offcanvas.Body className='player-body'>
                <div>
                    Start playing a song to see details here
                </div>
            </Offcanvas.Body>;
    };

    return (
        <React.Fragment>
            <button onClick={showPlayer} className='player-toggle'>
                <img src={spotifyLogo} alt='spotify-logo' />
            </button>
            <Offcanvas show={show} scroll={true} backdrop={false} placement='end' className='music-player'>
                <button onClick={hidePlayer} className='close-player'>
                    <FontAwesomeIcon icon={faTimesCircle} size='lg' />
                </button>
                {content}
            </Offcanvas>
        </React.Fragment>
    );
};