import { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

export const usePlayingController = () => {
  const [playing, setPlaying] = useState(true);
  const play = useCallback(() => setPlaying(true), []);
  const pause = useCallback(() => setPlaying(false), []);

  return { playing, play, pause };
};

export const useVolumeController = () => {
  const [volume, setVolume] = useState(0.3);
  const changeVolume = useCallback((value: number) => setVolume(value), []);

  return { volume, changeVolume };
};

export const useSeekController = () => {
  const [seekState, setSeekState] = useState<OnProgressProps>({
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  });

  const changeSeek = useCallback((value: number) => {
    setSeekState(before => ({
      ...before,
      playedSeconds: value,
    }));
  }, []);

  return { seekState, changeSeek, setSeekState };
};

export const useYoutubeController = () => {
  const [isSeeking, setIsSeeking] = useState(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  const { ...volumeController } = useVolumeController();
  const { ...playingController } = usePlayingController();
  const { seekState, changeSeek, setSeekState } = useSeekController();

  const changeSeekMouseDown = useCallback(() => setIsSeeking(true), []);

  const changeSeekMouseUp = useCallback(() => {
    setIsSeeking(false);
    console.log('よばれるじょー', playerRef);
    playerRef.current?.seekTo(seekState.playedSeconds, 'seconds');
  }, [seekState.playedSeconds]);

  const handleOnProgress = useCallback(
    (state: OnProgressProps) => {
      if (!isSeeking) {
        setSeekState(state);
      }
    },
    [isSeeking, setSeekState],
  );

  return {
    ...volumeController,
    ...playingController,
    playerRef,
    seekState,
    changeSeek,
    changeSeekMouseDown,
    changeSeekMouseUp,
    handleOnProgress,
  };
};
