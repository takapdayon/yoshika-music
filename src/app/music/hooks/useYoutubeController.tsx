import { useCallback, useState } from 'react';
import { ReactPlayerProps } from 'react-player';

const initialParameter = {
  pip: false,
  playing: true,
  controls: false,
  light: false,
  volume: 0.8,
  muted: false,
  played: 0,
  loaded: 0,
  duration: 0,
  playbackRate: 1.0,
  loop: false,
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

  const changeVolume = useCallback((newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    setVideo(before => ({
      ...before,
      volume: newValue,
    }));
  }, []);

  const changeSeek = useCallback((newValue: number | number[]) => {
    if (Array.isArray(newValue)) return;
    setVideo(before => ({
      ...before,
      played: newValue,
    }));
  }, []);

  const reset = useCallback(() => {
    setVideo(initialParameter);
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
