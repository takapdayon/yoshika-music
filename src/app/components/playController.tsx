'use client';

import {
  FirstPageRounded,
  LastPageRounded,
  PauseRounded,
  PlayArrowRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { Stack, Slider, IconButton, Box, Hidden } from '@mui/material';
import Card from '@mui/material/Card';
import { memo, useCallback } from 'react';
import { OnProgressProps } from 'react-player/base';

import { OutputMusic } from '../types';

import { CustomCardContent } from '@/components/customCard';

type SwitchPlayPauseProps = {
  playingMusic: OutputMusic | undefined;
  playVideo: () => void;
  pauseVideo: () => void;
  playing: boolean;
};

const SwitchPlayPause = memo(
  ({ playVideo, pauseVideo, playingMusic, playing }: SwitchPlayPauseProps) => (
    <IconButton
      disabled={!playingMusic?.id}
      aria-label={playing ? 'pause' : 'play'}
      onClick={playing ? pauseVideo : playVideo}
      size="small"
    >
      {playing ? <PauseRounded /> : <PlayArrowRounded />}
    </IconButton>
  ),
);

type PlayControllerProps = {
  playingMusicNum: number;
  playList: OutputMusic[];
  playedPlayList: OutputMusic[];
  volume: number;
  seekState: OnProgressProps;
  changeVolume: (newValue: number) => void;
  changeSeek: (newValue: number) => void;
  changeSeekPointerUp: () => void;
  changeSeekPointerDown: () => void;
  onBackPlayMusic: () => void;
  onForwardPlayMusic: () => void;
} & SwitchPlayPauseProps;

export const PlayController = memo(
  ({
    playVideo,
    pauseVideo,
    changeVolume,
    changeSeek,
    onBackPlayMusic,
    onForwardPlayMusic,
    changeSeekPointerUp,
    changeSeekPointerDown,
    seekState,
    playingMusicNum,
    playList,
    playedPlayList,
    playingMusic,
    playing,
    volume,
  }: PlayControllerProps) => {
    const handleOnChangeVolume = useCallback(
      (_: Event, value: number | number[]) => {
        if (Array.isArray(value)) return;
        changeVolume(value);
      },
      [changeVolume],
    );

    const handleOnChangeSeek = useCallback(
      (_: Event, value: number | number[]) => {
        if (Array.isArray(value)) return;
        changeSeek(value);
      },
      [changeSeek],
    );

    return (
      <Card
        sx={{
          width: 1,
          position: 'fixed',
          bottom: 0,
          border: 'none',
          borderShadow: 'none',
        }}
        variant="outlined"
      >
        <CustomCardContent>
          <Box
            sx={{ width: 1, position: 'fixed' }}
            display="flex"
            justifyContent="center"
          >
            <Slider
              size="small"
              valueLabelDisplay="off"
              onPointerUp={changeSeekPointerUp}
              onPointerDown={changeSeekPointerDown}
              onChange={handleOnChangeSeek}
              min={playingMusic?.playStartTime}
              max={playingMusic?.playEndTime}
              value={seekState.playedSeconds}
              sx={{
                p: 0,
                zIndex: 2,
                '@media (pointer: coarse)': {
                  m: '-20px',
                },
              }}
            />
          </Box>
          <Stack
            direction="row"
            spacing={2}
            display="flex"
            justifyContent="center"
            sx={{ pt: 2, mb: { xs: 1, md: 'unset' } }}
          >
            <IconButton
              disabled={!playedPlayList.length}
              aria-label="previous song"
              onClick={onBackPlayMusic}
              size="small"
            >
              <FirstPageRounded />
            </IconButton>
            <SwitchPlayPause
              playVideo={playVideo}
              pauseVideo={pauseVideo}
              playingMusic={playingMusic}
              playing={playing}
            />
            <IconButton
              disabled={
                !(playList.length && playingMusicNum !== playList.length - 1)
              }
              aria-label="next song"
              onClick={onForwardPlayMusic}
              size="small"
            >
              <LastPageRounded />
            </IconButton>
          </Stack>
          <Hidden mdDown>
            <Box
              sx={{
                px: 1,
                mb: 1,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Stack
                spacing={2}
                direction="row"
                sx={{
                  width: 350,
                }}
                justifyContent="center"
                alignItems="center"
              >
                <VolumeDownRounded />
                <Slider
                  size="small"
                  aria-label="Volume"
                  valueLabelDisplay="auto"
                  value={volume}
                  valueLabelFormat={value =>
                    (value * 100).toFixed(0).toString()
                  }
                  onChange={handleOnChangeVolume}
                  min={0}
                  max={1}
                  step={0.01}
                  sx={theme => ({
                    color:
                      theme.palette.mode === 'dark'
                        ? '#fff'
                        : 'rgba(0,0,0,0.87)',
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                      width: 12,
                      height: 12,
                      backgroundColor: '#fff',
                      '&:before': {
                        boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                      },
                      '&:hover, &.Mui-focusVisible, &.Mui-active': {
                        boxShadow: 'none',
                      },
                    },
                  })}
                />
                <VolumeUpRounded />
              </Stack>
            </Box>
          </Hidden>
        </CustomCardContent>
      </Card>
    );
  },
);
