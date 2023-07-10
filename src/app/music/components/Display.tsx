import { Box, Skeleton } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';

import { MusicType } from '@/types';

const useYoutubeDisplayHook = (playingMusic: MusicType | undefined) => {
  const youtubeUrl = useMemo(
    () =>
      playingMusic
        ? `https://www.youtube.com/watch?v=${playingMusic.youtubeId}`
        : '',
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
  playingMusic: MusicType | undefined;
  onEndPlayingMusic: () => void;
  videoParameter: ReactPlayerProps | null;
};

export const YoutubeDisplay = ({
  playingMusic,
  onEndPlayingMusic,
  videoParameter,
}: YoutubeDisplayProps) => {
  const { youtubeUrl, youtubeKey } = useYoutubeDisplayHook(playingMusic);

  // https://github.com/cookpete/react-player/issues/1565
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Box sx={{ height: 1 }}>
      {isLoaded ? (
        <ReactPlayer
          {...videoParameter}
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
                controls: 0,
                rel: 0,
                start: playingMusic?.playStartTime,
                end: playingMusic?.playEndTime,
              },
            },
          }}
          onEnded={onEndPlayingMusic}
        />
      ) : (
        <Skeleton variant="rectangular" width="100%" />
      )}
    </Box>
  );
};
