import { useCallback, useMemo, useState } from 'react';

import { OutputMusic } from '../types';

export const usePlayList = () => {
  const [playingMusicNum, setPlayingMusicNum] = useState<number>(0);
  const [playList, setPlayList] = useState<OutputMusic[]>([]);
  const [playedPlayList, setPlayedPlayList] = useState<OutputMusic[]>([]);

  const playingMusic = useMemo(
    () => playList.find((music, index) => index === playingMusicNum),
    [playList, playingMusicNum],
  );

  const addPlayList = useCallback((selectedMusic: OutputMusic) => {
    setPlayList(before => [...before, selectedMusic]);
  }, []);

  const delPlayList = (index: number) => {
    setPlayList(before => before.filter((_, i) => i !== index));
  };

  const selectPlayMusic = useCallback((selectedMusicNum: number) => {
    setPlayingMusicNum(selectedMusicNum);
  }, []);

  const onEndPlayingMusic = useCallback(
    (setNumber = 0) => {
      setPlayingMusicNum(setNumber);
      setPlayList(before =>
        before.filter((music, index) => index !== playingMusicNum),
      );
      setPlayedPlayList(before =>
        playingMusic ? [...before, playingMusic] : before,
      );
    },
    [playingMusicNum, playingMusic],
  );

  const onBackPlayMusic = useCallback(() => {
    setPlayingMusicNum(0);
    const lastPlayedMusic = playedPlayList.slice(-1)[0];
    setPlayedPlayList(before => before.slice(0, -1));
    setPlayList(before => [lastPlayedMusic, ...before]);
  }, [playedPlayList]);

  const onForwardPlayMusic = useCallback(() => {
    onEndPlayingMusic(playingMusicNum);
  }, [playingMusicNum, onEndPlayingMusic]);

  return {
    playingMusicNum,
    playList,
    playedPlayList,
    playingMusic,
    addPlayList,
    delPlayList,
    selectPlayMusic,
    onEndPlayingMusic,
    onBackPlayMusic,
    onForwardPlayMusic,
  };
};
