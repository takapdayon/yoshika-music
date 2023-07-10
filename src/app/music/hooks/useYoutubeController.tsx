import { useCallback, useState } from 'react';
import { ReactPlayerProps } from 'react-player';

const initialParameter = {
  pip: false,
  playing: true,
  controls: false,
  light: false,
  volume: 0.3,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
};

const resetParameter = {
  played: 0,
  loaded: 0,
  playing: true,
};

export const useYoutubeController = () => {
  const [videoParameter, setVideo] = useState<ReactPlayerProps | null>(
    initialParameter,
  );

  const playVideo = useCallback(() => {
    setVideo(before => ({ ...before, playing: true }));
  }, []);

  const pauseVideo = useCallback(() => {
    setVideo(before => ({ ...before, playing: false }));
  }, []);

  const changeVolume = useCallback((newValue: number) => {
    setVideo(before => ({
      ...before,
      volume: newValue,
    }));
  }, []);

  const changeSeek = useCallback((newValue: number) => {
    setVideo(before => ({
      ...before,
      played: newValue,
    }));
  }, []);

  const reset = useCallback(() => {
    setVideo(before => ({ ...before, ...resetParameter }));
  }, []);

  return {
    videoParameter,
    playVideo,
    pauseVideo,
    changeVolume,
    changeSeek,
    reset,
  };
};
