'use client';

import { AppBar, Grid, Toolbar, Typography } from '@mui/material';

export const Header = () => (
  <>
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            よしか！
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);
