import { useCallback, useMemo, useState } from 'react';

import { MusicType } from '@/types';

export const useMusicList = () => {
  const [playingMusicNum, setPlayingMusicNum] = useState<number>(0);
  const [musicList, setMusicList] = useState<MusicType[]>([]);
  const [playedMusicList, setPlayedMusicList] = useState<MusicType[]>([]);

  const playingMusic = useMemo(
    () => musicList.find((music, index) => index === playingMusicNum),
    [musicList, playingMusicNum],
  );

  const addPlayList = useCallback((selectedMusic: MusicType) => {
    setMusicList(before => [...before, selectedMusic]);
  }, []);

  const delPlayList = (index: number) => {
    setMusicList(before => before.filter((_, i) => i !== index));
  };

  const selectPlayMusic = useCallback((selectedMusicNum: number) => {
    setPlayingMusicNum(selectedMusicNum);
  }, []);

  const onEndPlayingMusic = useCallback(
    (setNumber = 0) => {
      setPlayingMusicNum(setNumber);
      setMusicList(before =>
        before.filter((music, index) => index !== playingMusicNum),
      );
      setPlayedMusicList(before =>
        playingMusic ? [...before, playingMusic] : before,
      );
    },
    [playingMusicNum, playingMusic],
  );

  const onBackPlayMusic = useCallback(() => {
    setPlayingMusicNum(0);
    const lastPlayedMusic = playedMusicList.slice(-1)[0];
    setPlayedMusicList(before => before.slice(0, -1));
    setMusicList(before => [lastPlayedMusic, ...before]);
  }, [playedMusicList]);

  const onForwardPlayMusic = useCallback(() => {
    onEndPlayingMusic(playingMusicNum);
  }, [playingMusicNum, onEndPlayingMusic]);

  return {
    playingMusicNum,
    musicList,
    playedMusicList,
    playingMusic,
    addPlayList,
    delPlayList,
    selectPlayMusic,
    onEndPlayingMusic,
    onBackPlayMusic,
    onForwardPlayMusic,
  };
};
