'use client';

import { Box, Skeleton } from '@mui/material';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { OnProgressProps } from 'react-player/base';

import { OutputMusic } from '../types';

const useYoutubeDisplayHook = (playingMusic: OutputMusic | undefined) => {
  const youtubeUrl = useMemo(
    () => (playingMusic ? playingMusic.youtubeUrl : ''),
    [playingMusic],
  );

  const youtubeKey = useMemo(
    () =>
      playingMusic
        ? `${playingMusic.playEndTime}${playingMusic.playStartTime}${playingMusic?.id}`
        : null,
    [playingMusic],
  );

  return {
    youtubeUrl,
    youtubeKey,
  };
};

type YoutubeDisplayProps = {
  playingMusic: OutputMusic | undefined;
  onEndPlayingMusic: () => void;
  reactPlayerProps: ReactPlayerProps | null;
  handleOnProgress: (state: OnProgressProps) => void;
  onPlayMusic: () => void;
  onPauseMusic: () => void;
};

export const YoutubeDisplay = forwardRef<ReactPlayer, YoutubeDisplayProps>(
  (
    {
      playingMusic,
      onEndPlayingMusic,
      reactPlayerProps,
      handleOnProgress,
      onPlayMusic,
      onPauseMusic,
    },
    ref,
  ) => {
    const { youtubeUrl, youtubeKey } = useYoutubeDisplayHook(playingMusic);

    // https://github.com/cookpete/react-player/issues/1565
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
      setIsLoaded(true);
    }, []);

    return (
      <Box sx={{ height: 1, aspectRatio: '16/9' }}>
        {isLoaded ? (
          <ReactPlayer
            {...reactPlayerProps}
            ref={ref}
            key={youtubeKey}
            url={youtubeUrl}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  enablejsapi: 0,
                  modestbranding: 1,
                  disablekb: 1,
                  controls: 0,
                  rel: 0,
                  start: playingMusic?.playStartTime,
                  end: playingMusic?.playEndTime,
                },
              },
            }}
            onEnded={onEndPlayingMusic}
            onPlay={onPlayMusic}
            onPause={onPauseMusic}
            onProgress={handleOnProgress}
          />
        ) : (
          <Skeleton variant="rectangular" width="100%" />
        )}
      </Box>
    );
  },
);
