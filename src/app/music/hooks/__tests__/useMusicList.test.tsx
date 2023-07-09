import { act, renderHook } from '@testing-library/react';

import { useMusicList } from '../useMusicList';

describe('useMusicListのテスト', () => {
  const data1 = {
    id: '001',
    youtubeId: '9QyhCXilmd0',
    title: 'アイドル',
    artist: 'YOASOBI',
    playStartTime: 4230,
    playEndTime: 4441,
    youtubeTitle:
      '【#歌枠】元気に楽しく歌います！🍠Singing Stream🍠Karaoke【Vtuber】',
  };
  const data2 = {
    id: '002',
    youtubeId: '9QyhCXilmd0',
    title: 'アイドル',
    artist: 'YOASOBI',
    playStartTime: 3230,
    playEndTime: 3441,
    youtubeTitle:
      '【#歌枠】元気に楽しく歌います！🍠Singing Stream🍠Karaoke【Vtuber】',
  };

  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => useMusicList());
    expect(result.current.playingMusicNum).toBe(0);
    expect(result.current.musicList).toStrictEqual([]);
    expect(result.current.playedMusicList).toStrictEqual([]);
    expect(result.current.playingMusic).toBeUndefined();
  });

  test('addPlayListで値が正しくセットされること', () => {
    const { result } = renderHook(() => useMusicList());
    act(() => result.current.addPlayList(data1));
    expect(result.current.musicList).toStrictEqual([data1]);
    act(() => result.current.addPlayList(data2));
    expect(result.current.musicList).toStrictEqual([data1, data2]);
  });

  test('selectPlayMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => useMusicList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    expect(result.current.playingMusic).toStrictEqual(data1);
    act(() => result.current.selectPlayMusic(1));
    expect(result.current.playingMusic).toStrictEqual(data2);
  });

  test('onEndPlayingMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => useMusicList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    act(() => result.current.selectPlayMusic(1));
    act(() => result.current.onEndPlayingMusic());
    expect(result.current.musicList).toStrictEqual([data1]);
    expect(result.current.playedMusicList).toStrictEqual([data2]);
    act(() => result.current.selectPlayMusic(0));
  });
});
