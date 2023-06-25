import {
  FastForwardRounded,
  FastRewindRounded,
  PauseRounded,
  PlayArrowRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from '@mui/icons-material';
import { CardContent, Stack, Slider, IconButton, Box } from '@mui/material';
import Card from '@mui/material/Card';
import { memo, useState } from 'react';

export const PlayController = memo(() => {
  const [paused, setPaused] = useState(false);
  return (
    <Card sx={{ width: 1, position: 'fixed', bottom: 0 }} variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <IconButton aria-label="previous song">
            <FastRewindRounded fontSize="large" />
          </IconButton>
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? (
              <PlayArrowRounded sx={{ fontSize: '3rem' }} />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} />
            )}
          </IconButton>
          <IconButton aria-label="next song">
            <FastForwardRounded fontSize="large" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            mb: 1,
            px: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Stack
            spacing={2}
            direction="row"
            sx={{
              width: 350,
            }}
          >
            <VolumeDownRounded />
            <Slider
              aria-label="Volume"
              defaultValue={30}
              sx={theme => ({
                color:
                  theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  width: 24,
                  height: 24,
                  backgroundColor: '#fff',
                  '&:before': {
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
                  },
                  '&:hover, &.Mui-focusVisible, &.Mui-active': {
                    boxShadow: 'none',
                  },
                },
              })}
            />
            <VolumeUpRounded />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});
