'use client';

import Grid from '@mui/material/Unstable_Grid2';

import { Display } from './components/Display';
import { PlayController } from './components/PlayController';
import { PlayList } from './components/PlayList';
import { MusicTable } from './components/Table';

const Page = () => (
  <>
    <Grid
      container
      spacing={2}
      columns={16}
      sx={{ mx: 0, px: 1, width: '100%', maxHeight: 800 }}
      justifyContent="space-between"
    >
      <Grid
        xs={6}
        columns={16}
        direction="column"
        justifyContent="space-between"
        sx={{ maxHeight: 800 }}
      >
        <Grid sx={{ width: '100%', height: 1 / 2 }}>
          <Display />
        </Grid>
        <Grid sx={{ width: '100%', height: 1 / 2 }}>
          <PlayList />
        </Grid>
      </Grid>
      <Grid xs={10} sx={{ maxHeight: 800 }}>
        <MusicTable />
      </Grid>
    </Grid>
    <PlayController />
  </>
);

export default Page;
