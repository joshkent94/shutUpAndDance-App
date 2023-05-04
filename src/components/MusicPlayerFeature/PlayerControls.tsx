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
    playNextSong,
    playPreviousSong,
    selectAccessToken,
    selectRefreshToken,
    togglePlay,
} from '@utils/state/spotifySlice'
import { useAppDispatch } from '@utils/state/store'

// React component built using Material UI library
export default function PlayerControls({ currentlyPlaying }) {
    const dispatch = useAppDispatch()
    const accessToken = useSelector(selectAccessToken)
    const refreshToken = useSelector(selectRefreshToken)
    const duration = currentlyPlaying.duration
    const [position, setPosition] = useState(currentlyPlaying.progress)
    const [paused, setPaused] = useState(!currentlyPlaying.isPlaying)

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
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
            })
        )
        setPosition(value)
    }

    // set an interval to update the song position every half second
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (!paused) {
                setPosition(position + 1)
            }
        }, 1000)

        return () => clearInterval(intervalId)
    }, [paused, position])

    // set pause state and send call to Spotify
    const togglePlayState = () => {
        dispatch(
            togglePlay({
                paused: paused,
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
            })
        )
        setPaused(!paused)
    }

    // send previous call to Spotify
    const playPrevious = () => {
        dispatch(
            playPreviousSong({
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
            })
        )
    }

    // send next call to Spotify
    const playNext = () => {
        dispatch(
            playNextSong({
                deviceId: currentlyPlaying.device.id,
                accessToken,
                refreshToken,
            })
        )
    }

    return (
        <Box className="player-controls">
            <Slider
                aria-label="time-indicator"
                value={position}
                min={0}
                step={1}
                max={duration}
                onChange={setSongPosition}
                className="duration-slider"
            />
            <Box className="slider-times">
                <Typography className="slider-time">
                    {formatTime(position)}
                </Typography>
                <Typography className="slider-time">
                    -{formatTime(duration - position)}
                </Typography>
            </Box>
            <Box className="player-buttons">
                <IconButton aria-label="previous song" onClick={playPrevious}>
                    <FastRewindRounded
                        style={{ fontSize: 28 }}
                        htmlColor="white"
                    />
                </IconButton>
                <IconButton
                    aria-label={paused ? 'play' : 'pause'}
                    onClick={togglePlayState}
                >
                    {paused ? (
                        <PlayArrowRounded
                            style={{ fontSize: 28 }}
                            htmlColor="white"
                        />
                    ) : (
                        <PauseRounded
                            style={{ fontSize: 28 }}
                            htmlColor="white"
                        />
                    )}
                </IconButton>
                <IconButton aria-label="next song" onClick={playNext}>
                    <FastForwardRounded
                        style={{ fontSize: 28 }}
                        htmlColor="white"
                    />
                </IconButton>
            </Box>
        </Box>
    )
}
