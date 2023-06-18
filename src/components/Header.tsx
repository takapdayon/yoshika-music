'use client';

import { AppBar, CssBaseline, Grid, Toolbar, Typography } from '@mui/material';

export const Header = () => {
  return (
    <>
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography
              variant='h6'
              noWrap
              component='div'
            >
              輪廻がはは
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
