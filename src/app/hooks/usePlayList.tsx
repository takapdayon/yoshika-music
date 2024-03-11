import { useCallback, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { OutputMusic } from '../types';

import { useSnackbarMessage } from './useSnackBar';

export type PlayListType = {
  playListId: string;
} & OutputMusic;

export const usePlayList = () => {
  const [playingMusicNum, setPlayingMusicNum] = useState<number>(0);
  const [playList, setPlayList] = useState<PlayListType[]>([]);
  const [playedPlayList, setPlayedPlayList] = useState<PlayListType[]>([]);
  const { successMessage, errorMessage } = useSnackbarMessage();

  const playingMusic = useMemo(
    () => playList.find((music, index) => index === playingMusicNum),
    [playList, playingMusicNum],
  );

  const addPlayList = useCallback(
    (selectedMusic: OutputMusic) => {
      setPlayList(before => [
        ...before,
        { ...selectedMusic, playListId: uuidv4() },
      ]);
      successMessage(`プレイリストに追加しました: ${selectedMusic.title}`);
    },
    [successMessage],
  );

  const delPlayList = useCallback(
    (index: number) => {
      const delMusic = playList.find((_, i) => i === index);
      setPlayList(before => before.filter((_, i) => i !== index));
      errorMessage(`プレイリストから削除しました: ${delMusic?.title ?? ''}`);
    },
    [errorMessage, playList],
  );

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
