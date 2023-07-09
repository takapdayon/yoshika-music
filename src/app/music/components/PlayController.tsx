import {
  FirstPageRounded,
  LastPageRounded,
  PauseRounded,
  PlayArrowRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { Stack, Slider, IconButton, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { memo, useCallback } from 'react';
import { ReactPlayerProps } from 'react-player';

import { CustomCardContent } from '@/components/CustomCard';
import { MusicType } from '@/types';

type Common = {
  videoParameter: ReactPlayerProps | null;
};

type SwitchPlayPauseProps = {
  playingMusic: MusicType | undefined;
  playVideo: () => void;
  pauseVideo: () => void;
} & Common;

const SwitchPlayPause = memo(
  ({
    playVideo,
    pauseVideo,
    playingMusic,
    videoParameter,
  }: SwitchPlayPauseProps) => (
    <IconButton
      disabled={!playingMusic?.id}
      aria-label={videoParameter?.playing ? 'pause' : 'play'}
      onClick={videoParameter?.playing ? pauseVideo : playVideo}
      size="small"
    >
      {videoParameter?.playing ? (
        <PauseRounded sx={{ fontSize: '3rem' }} />
      ) : (
        <PlayArrowRounded sx={{ fontSize: '3rem' }} />
      )}
    </IconButton>
  ),
);

type PlayControllerProps = {
  playingMusicNum: number;
  musicList: MusicType[];
  playedMusicList: MusicType[];
  changeVolume: (newValue: number | number[]) => void;
  changeSeek: (newValue: number | number[]) => void;
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
    playingMusicNum,
    musicList,
    playedMusicList,
    playingMusic,
    videoParameter,
  }: PlayControllerProps) => {
    const handleOnChangeVolume = useCallback(
      (_: Event, value: number | number[]) => {
        changeVolume(value);
      },
      [changeVolume],
    );

    const handleOnChangeSeek = useCallback(
      (_: Event, value: number | number[]) => {
        changeSeek(value);
      },
      [changeSeek],
    );

    return (
      <Card sx={{ width: 1, position: 'fixed', bottom: 0 }} variant="outlined">
        <CustomCardContent>
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <IconButton
              disabled={!playedMusicList.length}
              aria-label="previous song"
              onClick={onBackPlayMusic}
              size="small"
            >
              <FirstPageRounded fontSize="large" />
            </IconButton>
            <SwitchPlayPause
              playVideo={playVideo}
              pauseVideo={pauseVideo}
              playingMusic={playingMusic}
              videoParameter={videoParameter}
            />
            <IconButton
              disabled={
                !(musicList.length && playingMusicNum !== musicList.length - 1)
              }
              aria-label="next song"
              onClick={onForwardPlayMusic}
              size="small"
            >
              <LastPageRounded fontSize="large" />
            </IconButton>
          </Stack>
          <Box
            sx={{
              mb: 1,
              px: 1,
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
            >
              <VolumeDownRounded />
              <Slider
                size="small"
                aria-label="Volume"
                defaultValue={30}
                valueLabelDisplay="auto"
                sx={theme => ({
                  color:
                    theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
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
        </CustomCardContent>
      </Card>
    );
  },
);
