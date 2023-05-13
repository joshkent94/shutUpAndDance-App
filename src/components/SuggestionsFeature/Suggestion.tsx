import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import {
    getPlayingSong,
    selectAccessToken,
    selectCurrentlyPlaying,
    selectRefreshToken,
    togglePlay,
} from '@utils/state/spotifySlice'
import { useAppDispatch } from '@utils/state/store'

export default function Suggestion({ track }) {
    const dispatch = useAppDispatch()
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const currentlyPlaying = useSelector(selectCurrentlyPlaying)
    const [paused] = useState(
        !(track.uri === currentlyPlaying.uri && currentlyPlaying.isPlaying)
    )
    const faPlayProp = faPlay as IconProp
    const faPauseProp = faPause as IconProp

    // toggle play and update currently playing
    const togglePlayState = () => {
        dispatch(
            togglePlay({
                paused: paused,
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
                uri: track.uri,
            })
        )
            .unwrap()
            .then(() => {
                dispatch(
                    getPlayingSong({
                        accessToken,
                        refreshToken,
                    })
                )
            })
    }

    let playButton
    if (currentlyPlaying.device) {
        if (!paused) {
            playButton = (
                <button
                    className="ml-8 w-auto cursor-pointer border-none bg-none align-middle text-[1.7rem] text-primary hover:text-fourth"
                    onClick={togglePlayState}
                >
                    <FontAwesomeIcon icon={faPauseProp} />
                </button>
            )
        } else {
            playButton = (
                <button
                    className="ml-8 w-auto cursor-pointer border-none bg-none align-middle text-[1.7rem] text-primary hover:text-fourth"
                    onClick={togglePlayState}
                >
                    <FontAwesomeIcon icon={faPlayProp} />
                </button>
            )
        }
    }

    return (
        <div className="track mb-[0.7rem] flex h-[140px] w-full items-center rounded-[0.2rem] border border-third bg-secondary p-2 text-primary">
            <div className="border-r border-r-third pr-[0.8rem]">
                <Image
                    src={track.images[1].url}
                    alt={track.name}
                    className="h-[120px] w-[120px] rounded-full"
                    width={120}
                    height={120}
                    priority
                />
            </div>
            <div className="flex flex-col justify-center overflow-hidden text-ellipsis whitespace-nowrap pl-[0.8rem]">
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap pb-[0.2rem] text-[1.2rem] font-bold">
                    {track.name}
                </p>
                <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-normal">
                    {track.artist} || {track.album}
                </p>
            </div>
            <div className="mr-8 flex grow items-center justify-end">
                {playButton}
            </div>
        </div>
    )
}
