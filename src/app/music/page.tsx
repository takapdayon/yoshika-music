'use client';

import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

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
    playerRef,
    changeSeek,
    changeSeekMouseDown,
    changeSeekMouseUp,
    handleOnProgress,
  } = useYoutubeController();

  return (
    <>
      <Grid2 container spacing={2} sx={{ height: 1, width: 1, px: 3 }}>
        <Grid2 xs={5} sx={{ height: '85%', maxHeight: '85%' }}>
          <Stack spacing={2} sx={{ height: 1 }}>
            <Box sx={{ height: '60%', maxHeight: '60%', borderRadius: 2 }}>
              <YoutubeDisplay
                ref={playerRef}
                playingMusic={playingMusic}
                onEndPlayingMusic={onEndPlayingMusic}
                reactPlayerProps={{ playing, volume }}
                handleOnProgress={handleOnProgress}
              />
            </Box>
            <Box
              sx={{
                height: '40%',
                maxHeight: '40%',
                '& ::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              <PlayList
                musicList={musicList}
                playingMusicNum={playingMusicNum}
                delPlayList={delPlayList}
                selectPlayMusic={selectPlayMusic}
              />
            </Box>
          </Stack>
        </Grid2>
        <Grid2
          xs={7}
          sx={{
            height: '85%',
            maxHeight: '85%',
            '& ::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <MusicTable addPlayList={addPlayList} />
        </Grid2>
      </Grid2>
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
