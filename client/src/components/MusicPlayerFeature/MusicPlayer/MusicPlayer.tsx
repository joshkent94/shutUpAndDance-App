import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import spotifyLogo from '../../../assets/Spotify_Logo_RGB_Green.png'
import {
    getPlayingSong,
    selectAccessToken,
    selectCurrentlyPlaying,
    selectRefreshToken,
} from '../../../utils/state/spotifySlice'
import SongDetails from '../SongDetails/SongDetails'
import PlayerControls from '../PlayerControls/PlayerControls'
import useSWR from 'swr'
import './MusicPlayer.scss'

export default function MusicPlayer() {
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying)
    const [show, setShow] = useState(false)
    const faTimesCircleProp = faTimesCircle as IconProp

    // poll for currently playing song every second if music player is showing
    useSWR(
        show ? refreshToken : null,
        () =>
            dispatch(
                getPlayingSong({
                    accessToken,
                    refreshToken,
                })
            ),
        {
            refreshInterval: 1000,
            revalidateOnFocus: false,
        }
    )

    // transition tab out and player in
    const showPlayer = () => {
        (
            document.getElementsByClassName('player-toggle')[0] as HTMLElement
        ).style.right = '-50px'
        setTimeout(() => {
            setShow(true)
        }, 200)
    }

    // transition player out and tab in
    const hidePlayer = () => {
        if (show) {
            setShow(false)
            setTimeout(() => {
                (
                    document.getElementsByClassName(
                        'player-toggle'
                    )[0] as HTMLElement
                ).style.right = '0px'
            }, 300)
        }
    }

    let content
    if (currentlyPlaying.name) {
        content = (
            <Offcanvas.Body className="player-body">
                <SongDetails
                    currentlyPlaying={currentlyPlaying}
                    key={currentlyPlaying.id || 0}
                />
                <PlayerControls
                    currentlyPlaying={currentlyPlaying}
                    key={currentlyPlaying.progress || 1}
                />
            </Offcanvas.Body>
        )
    } else {
        content = (
            <Offcanvas.Body className="player-body">
                <div>Start playing a song to see details here</div>
            </Offcanvas.Body>
        )
    }

    return (
        <React.Fragment>
            <button onClick={showPlayer} className="player-toggle">
                <img src={spotifyLogo} alt="spotify-logo" />
            </button>
            <Offcanvas
                show={show}
                scroll={true}
                backdrop={false}
                placement="end"
                className="music-player"
            >
                <button onClick={hidePlayer} className="close-player">
                    <FontAwesomeIcon icon={faTimesCircleProp} size="lg" />
                </button>
                {content}
            </Offcanvas>
        </React.Fragment>
    )
}
