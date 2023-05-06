import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import spotifyLogo from '@assets/Spotify_Logo_RGB_Green.png'
import useSWR from 'swr'
import {
    getPlayingSong,
    selectAccessToken,
    selectCurrentlyPlaying,
    selectRefreshToken,
} from '@utils/state/spotifySlice'
import { useAppDispatch } from '@utils/state/store'
import SongDetails from './SongDetails'
import PlayerControls from './PlayerControls'

export default function MusicPlayer() {
    const dispatch = useAppDispatch()
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying)
    const [show, setShow] = useState(false)

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
            refreshInterval: 5000,
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
                    duration={currentlyPlaying.duration}
                    position={currentlyPlaying.progress}
                    isPlaying={currentlyPlaying.isPlaying}
                    device={currentlyPlaying.device.id}
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
                <Image src={spotifyLogo} alt="spotify-logo" priority />
            </button>
            <Offcanvas
                show={show}
                scroll={true}
                backdrop={false}
                placement="end"
                className="music-player"
            >
                <button onClick={hidePlayer} className="close-player">
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                </button>
                {content}
            </Offcanvas>
        </React.Fragment>
    )
}
