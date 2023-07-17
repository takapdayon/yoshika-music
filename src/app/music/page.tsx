'use client';

import Grid from '@mui/material/Unstable_Grid2';

import { YoutubeDisplay } from './components/Display';
import { PlayController } from './components/PlayController';
import { PlayList } from './components/PlayList';
import { MusicTable } from './components/Table';
import { useMusicList } from './hooks/useMusicList';
import { useYoutubeController } from './hooks/useYoutubeController';

const Page = () => {
  const {
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
  } = useMusicList();

  const {
    volume,
    changeVolume,
    playing,
    play,
    pause,
    seekState,
    changeSeek,
    changeSeekMouseDown,
    changeSeekMouseUp,
    handleOnProgress,
  } = useYoutubeController();

  return (
    <>
      <Grid
        container
        sx={{ mb: '100px', height: `calc(100% - 100px)`, padding: 2 }}
      >
        <Grid xs={5} sx={{ height: 1 }}>
          <Grid sx={{ height: 1 / 2, pb: 2 }}>
            <YoutubeDisplay
              playingMusic={playingMusic}
              onEndPlayingMusic={onEndPlayingMusic}
              reactPlayerProps={{ playing, volume }}
              handleOnProgress={handleOnProgress}
            />
          </Grid>
          <Grid sx={{ height: 1 / 2 }}>
            <PlayList
              musicList={musicList}
              playingMusicNum={playingMusicNum}
              delPlayList={delPlayList}
              selectPlayMusic={selectPlayMusic}
            />
          </Grid>
        </Grid>
        <Grid xs={7} sx={{ pl: 2, height: 1 }}>
          <MusicTable addPlayList={addPlayList} />
        </Grid>
      </Grid>
      <PlayController
        playVideo={play}
        pauseVideo={pause}
        changeVolume={changeVolume}
        changeSeek={changeSeek}
        volume={volume}
        playing={playing}
        playingMusicNum={playingMusicNum}
        musicList={musicList}
        playedMusicList={playedMusicList}
        playingMusic={playingMusic}
        onBackPlayMusic={onBackPlayMusic}
        onForwardPlayMusic={onForwardPlayMusic}
        changeSeekMouseUp={changeSeekMouseUp}
        changeSeekMouseDown={changeSeekMouseDown}
        seekState={seekState}
      />
    </>
  );
};

export default Page;
