import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import {
    changeSongPosition,
    getPlayingSong,
    playNextSong,
    playPreviousSong,
    selectAccessToken,
    selectRefreshToken,
    togglePlay,
} from '@utils/state/spotifySlice'
import { useAppDispatch } from '@utils/state/store'

// React component built using Material UI library
export default function PlayerControls({
    duration,
    position,
    isPlaying,
    device,
}) {
    const dispatch = useAppDispatch()
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const [localPosition, setLocalPosition] = useState(position)
    const [localIsPlaying, setLocalIsPlaying] = useState(isPlaying)

    // set an interval to update the song position every 100ms
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (localIsPlaying && localPosition < duration) {
                setLocalPosition(localPosition + 0.1)
            }
        }, 100)
        return () => clearInterval(intervalId)
    }, [localPosition, duration, localIsPlaying, position])

    // convert times from seconds to a time format
    const formatTime = (value) => {
        const minute = Math.floor(value / 60)
        const secondLeft = value - minute * 60
        return `${minute}:${secondLeft <= 9 ? `0${secondLeft}` : secondLeft}`
    }

    // set song position in component state and dispatch action to Spotify
    const setSongPosition = (e, value) => {
        dispatch(
            changeSongPosition({
                position: value,
                deviceId: device,
                accessToken,
                refreshToken,
            })
        )
    }

    // set pause state and send call to Spotify
    const togglePlayState = () => {
        setLocalIsPlaying(!localIsPlaying)
        dispatch(
            togglePlay({
                paused: !isPlaying,
                deviceId: device,
                accessToken,
                refreshToken,
            })
        )
    }

    // send previous call to Spotify
    const playPrevious = () => {
        dispatch(
            playPreviousSong({
                deviceId: device,
                accessToken,
                refreshToken,
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

    // send next call to Spotify
    const playNext = () => {
        dispatch(
            playNextSong({
                deviceId: device,
                accessToken,
                refreshToken,
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

    return (
        <Box className="flex h-2/5 w-full flex-col items-center justify-center px-2 pt-[0.3rem]">
            <Slider
                aria-label="time-indicator"
                value={localPosition}
                min={0}
                max={duration}
                onChange={(_, value) => setLocalPosition(value)}
                onChangeCommitted={setSongPosition}
                className="py-1.5 text-secondary"
            />
            <Box className="flex w-full items-center justify-between">
                <Typography className="text-xs font-medium tracking-[0.2] opacity-70">
                    {formatTime(Math.floor(localPosition))}
                </Typography>
                <Typography className="text-xs font-medium tracking-[0.2] opacity-70">
                    -{formatTime(duration - Math.floor(localPosition))}
                </Typography>
            </Box>
            <Box className="mt-[-1.1rem] flex items-center justify-center">
                <IconButton aria-label="previous-song" onClick={playPrevious}>
                    <FastRewindRounded
                        style={{ fontSize: 28 }}
                        htmlColor="white"
                        className="hover:text-fourth"
                    />
                </IconButton>
                <IconButton
                    aria-label={!localIsPlaying ? 'play' : 'pause'}
                    onClick={togglePlayState}
                >
                    {!localIsPlaying ? (
                        <PlayArrowRounded
                            style={{ fontSize: 28 }}
                            htmlColor="white"
                            className="hover:text-fourth"
                        />
                    ) : (
                        <PauseRounded
                            style={{ fontSize: 28 }}
                            htmlColor="white"
                            className="hover:text-fourth"
                        />
                    )}
                </IconButton>
                <IconButton aria-label="next-song" onClick={playNext}>
                    <FastForwardRounded
                        style={{ fontSize: 28 }}
                        htmlColor="white"
                        className="hover:text-fourth"
                    />
                </IconButton>
            </Box>
        </Box>
    )
}
