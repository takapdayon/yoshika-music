import { act, renderHook } from '@testing-library/react';

import { useYoutubeController } from '../useYoutubeController';

describe('useMusicListのテスト', () => {
  const data = {
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

  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => useYoutubeController());
    expect(result.current.videoParameter).toStrictEqual(data);
  });

  test('playVideoで値が正しくセットされること', () => {
    const { result } = renderHook(() => useYoutubeController());
    act(() => result.current.playVideo());
    expect(result.current.videoParameter).toStrictEqual({
      ...data,
      ...{ playing: true },
    });
  });

  test('pauseVideoで値が正しくセットされること', () => {
    const { result } = renderHook(() => useYoutubeController());
    act(() => result.current.pauseVideo());
    expect(result.current.videoParameter).toStrictEqual({
      ...data,
      ...{ playing: false },
    });
  });

  test('changeVolumeで値が正しくセットされること', () => {
    const { result } = renderHook(() => useYoutubeController());
    act(() => result.current.changeVolume(50));
    expect(result.current.videoParameter).toStrictEqual({
      ...data,
      ...{ volume: 50 },
    });
  });

  test('changeSeekで値が正しくセットされること', () => {
    const { result } = renderHook(() => useYoutubeController());
    act(() => result.current.changeSeek(50));
    expect(result.current.videoParameter).toStrictEqual({
      ...data,
      ...{ played: 50 },
    });
  });
});
