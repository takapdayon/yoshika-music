import { act, renderHook } from '@testing-library/react';

import {
  usePlayingController,
  useSeekController,
  useVolumeController,
} from '../useYoutubeController';

describe('usePlayingControllerのテスト', () => {
  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayingController());
    expect(result.current.playing).toBe(true);
  });
  test('playで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayingController());
    act(() => result.current.play());
    expect(result.current.playing).toBe(true);
  });
  test('pauseで値が正しくセットされること', () => {
    const { result } = renderHook(() => usePlayingController());
    act(() => result.current.pause());
    expect(result.current.playing).toBe(false);
  });
});

describe('useVolumeControllerのテスト', () => {
  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => useVolumeController());
    expect(result.current.volume).toBe(0.3);
  });
  test('changeVolumeで値が正しくセットされること', () => {
    const { result } = renderHook(() => useVolumeController());
    act(() => result.current.changeVolume(1));
    expect(result.current.volume).toBe(1);
  });
});

describe('useSeekControllerのテスト', () => {
  const data = {
    played: 0,
    playedSeconds: 0,
    loaded: 0,
    loadedSeconds: 0,
  };
  test('初期値が正しくセットされること', () => {
    const { result } = renderHook(() => useSeekController());
    expect(result.current.seekState).toStrictEqual(data);
  });
  test('changeSeekで値が正しくセットされること', () => {
    const { result } = renderHook(() => useSeekController());
    act(() => result.current.changeSeek(0.005));
    expect(result.current.seekState).toStrictEqual({ ...data, played: 0.005 });
  });
  test('changeSeekで値が正しくセットされること', () => {
    const { result } = renderHook(() => useSeekController());
    const testData = {
      played: 0.0005,
      playedSeconds: 0.0005,
      loaded: 0.0005,
      loadedSeconds: 0.0005,
    };
    act(() => result.current.setSeekState(testData));
    expect(result.current.seekState).toStrictEqual(testData);
  });
});
