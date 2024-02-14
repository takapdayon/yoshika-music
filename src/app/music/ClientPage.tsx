'use client';

import { Box, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { YoutubeDisplay } from './components/Display';
import { PlayController } from './components/PlayController';
import { PlayList } from './components/PlayList';
import { MusicTable } from './components/Table';
import { usePlayList } from './hooks/usePlayList';
import { useYoutubeController } from './hooks/useYoutubeController';
import { OutputMusic } from './types';

const ClientPage = ({ musicList }: { musicList: OutputMusic[] }) => {
  const {
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
  } = usePlayList();

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
          <MusicTable addPlayList={addPlayList} musicList={musicList} />
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
        musicList={playList}
        playedMusicList={playedPlayList}
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

export default ClientPage;