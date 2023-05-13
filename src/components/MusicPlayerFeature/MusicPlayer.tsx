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
        ).setAttribute( 'style', 'right: -50px !important' )
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
            }, 350)
        }
    }

    let content
    if (currentlyPlaying.name) {
        content = (
            <Offcanvas.Body className="bg-primary text-secondary flex flex-col justify-center items-center py-[0.2rem] px-2 rounded-2xl">
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
            <Offcanvas.Body className="bg-primary text-secondary flex flex-col justify-center items-center py-[0.2rem] px-2 rounded-2xl">
                <div>Start playing a song to see details here</div>
            </Offcanvas.Body>
        )
    }

    return (
        <React.Fragment>
            <button onClick={showPlayer} className="player-toggle h-[150px] w-[50px] fixed bottom-[25px] right-0 border-none rounded-tl-2xl rounded-bl-2xl bg-primary flex justify-center items-center transition-[right] duration-200 ease-linear hover:cursor-pointer z-50">
                <Image src={spotifyLogo} alt="spotify-logo" priority className='rotate-[270deg] m-0 h-9 max-w-none'/>
            </button>
            <Offcanvas
                show={show}
                scroll={true}
                backdrop={false}
                placement="end"
                className="music-player h-[150px] w-[350px] z-50 fixed bottom-[25px] right-[25px] flex border-none m-0 bg-none duration-300 ease-linear top-auto"
            >
                <button onClick={hidePlayer} className="close-player absolute hidden top-[-6px] right-[-6px] h-5 w-5 border-none rounded-2xl justify-center items-center bg-secondary text-fourth">
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                </button>
                {content}
            </Offcanvas>
        </React.Fragment>
    )
}
