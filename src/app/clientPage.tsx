'use client';

import { Box, Hidden, Paper, Stack } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { YoutubeDisplay } from './components/display';
import { PlayController } from './components/playController';
import { PlayList } from './components/playList';
import { MusicTable } from './components/table';
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
    changeSeekPointerDown,
    changeSeekPointerUp,
    handleOnProgress,
  } = useYoutubeController();

  return (
    <>
      <Grid2
        container
        spacing={{ xs: 0, md: 2 }}
        sx={{ height: 1, width: 1, px: { xs: 0, md: 3 } }}
      >
        <Grid2
          xs={12}
          md={5}
          sx={{
            height: { xs: 'unset', md: '87%' },
            maxHeight: { xs: 'unset', md: '87%' },
            mb: { xs: 3, md: 0 },
          }}
        >
          <Stack spacing={{ xs: 0, md: 2 }} sx={{ height: 1 }}>
            <Box
              sx={{
                width: 1,
                borderRadius: 2,
                aspectRadio: '16/9',
              }}
            >
              <YoutubeDisplay
                ref={playerRef}
                playingMusic={playingMusic}
                onEndPlayingMusic={onEndPlayingMusic}
                reactPlayerProps={{ playing, volume }}
                handleOnProgress={handleOnProgress}
                onPauseMusic={pause}
                onPlayMusic={play}
              />
            </Box>
            <Hidden mdDown>
              <Box
                sx={{
                  height: 1,
                  overflow: 'hidden',
                  '& ::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
                component={Paper}
              >
                <PlayList
                  playList={playList}
                  playingMusicNum={playingMusicNum}
                  delPlayList={delPlayList}
                  selectPlayMusic={selectPlayMusic}
                />
              </Box>
            </Hidden>
          </Stack>
        </Grid2>
        <Grid2
          xs={12}
          md={7}
          sx={{
            height: '87%',
            maxHeight: '87%',
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
        playList={playList}
        playedPlayList={playedPlayList}
        playingMusic={playingMusic}
        onBackPlayMusic={onBackPlayMusic}
        onForwardPlayMusic={onForwardPlayMusic}
        changeSeekPointerUp={changeSeekPointerUp}
        changeSeekPointerDown={changeSeekPointerDown}
        seekState={seekState}
      />
    </>
  );
};

export default ClientPage;
