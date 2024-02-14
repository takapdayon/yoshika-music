import { act, renderHook } from '@testing-library/react';

import { usePlayList } from '../usePlayList';

describe('usePlayListのテスト', () => {
  const data1 = {
    id: '001',
    youtubeUrl: '9QyhCXilmd0',
    title: 'アイドル',
    artist: 'YOASOBI',
    playStartTime: 4230,
    playEndTime: 4441,
    formatPlayTime: 3230,
    playTime: 3441 - 4230,
    youtubeTitle:
      '【#歌枠】元気に楽しく歌います！🍠Singing Stream🍠Karaoke【Vtuber】',
  };
  const data2 = {
    id: '002',
    youtubeUrl: '9QyhCXilmd0',
    title: 'アイドル',
    artist: 'YOASOBI',
    playStartTime: 3230,
    playEndTime: 3441,
    formatPlayTime: 3230,
    playTime: 3441 - 3230,
    youtubeTitle:
      '【#歌枠】元気に楽しく歌います！🍠Singing Stream🍠Karaoke【Vtuber】',
  };

  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    expect(result.current.playingMusicNum).toBe(0);
    expect(result.current.playList).toStrictEqual([]);
    expect(result.current.playedPlayList).toStrictEqual([]);
    expect(result.current.playingMusic).toBeUndefined();
  });

  test('addPlayListで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    expect(result.current.playList).toStrictEqual([data1]);
    act(() => result.current.addPlayList(data2));
    expect(result.current.playList).toStrictEqual([data1, data2]);
  });

  test('delPlayListで値が正しく削除されること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    expect(result.current.playList).toStrictEqual([data1, data2]);
    act(() => result.current.delPlayList(1));
    expect(result.current.playList).toStrictEqual([data1]);
  });

  test('selectPlayMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    expect(result.current.playingMusic).toStrictEqual(data1);
    act(() => result.current.selectPlayMusic(1));
    expect(result.current.playingMusic).toStrictEqual(data2);
  });

  test('onEndPlayingMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    act(() => result.current.selectPlayMusic(1));
    act(() => result.current.onEndPlayingMusic());
    expect(result.current.playList).toStrictEqual([data1]);
    expect(result.current.playedPlayList).toStrictEqual([data2]);
    act(() => result.current.selectPlayMusic(0));
  });
});
