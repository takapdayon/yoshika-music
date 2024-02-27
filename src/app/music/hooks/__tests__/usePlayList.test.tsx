import { act, renderHook } from '@testing-library/react';
import { v4 as uuidv4 } from 'uuid';

import { usePlayList } from '../usePlayList';

vi.mock('uuid');

describe('usePlayListのテスト', () => {
  (uuidv4 as jest.Mock).mockReturnValue('uuid-test');

  const data1 = {
    id: '001',
    youtubeUrl: '9QyhCXilmd0',
    title: 'アイドル',
    artist: 'YOASOBI',
    playStartTime: 4230,
    playEndTime: 4441,
    formattedPlayTime: '03:30',
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
    formattedPlayTime: '03:30',
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
    expect(result.current.playList).toStrictEqual([
      { ...data1, playListId: 'uuid-test' },
    ]);
    act(() => result.current.addPlayList(data2));
    expect(result.current.playList).toStrictEqual([
      { ...data1, playListId: 'uuid-test' },
      { ...data2, playListId: 'uuid-test' },
    ]);
  });

  test('delPlayListで値が正しく削除されること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    expect(result.current.playList).toStrictEqual([
      { ...data1, playListId: 'uuid-test' },
      { ...data2, playListId: 'uuid-test' },
    ]);
    act(() => result.current.delPlayList(1));
    expect(result.current.playList).toStrictEqual([
      { ...data1, playListId: 'uuid-test' },
    ]);
  });

  test('selectPlayMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    expect(result.current.playingMusic).toStrictEqual({
      ...data1,
      playListId: 'uuid-test',
    });
    act(() => result.current.selectPlayMusic(1));
    expect(result.current.playingMusic).toStrictEqual({
      ...data2,
      playListId: 'uuid-test',
    });
  });

  test('onEndPlayingMusicで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayList());
    act(() => result.current.addPlayList(data1));
    act(() => result.current.addPlayList(data2));
    act(() => result.current.selectPlayMusic(1));
    act(() => result.current.onEndPlayingMusic());
    expect(result.current.playList).toStrictEqual([
      { ...data1, playListId: 'uuid-test' },
    ]);
    expect(result.current.playedPlayList).toStrictEqual([
      { ...data2, playListId: 'uuid-test' },
    ]);
    act(() => result.current.selectPlayMusic(0));
  });
});
