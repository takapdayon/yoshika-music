import { AppBar, Grid, Toolbar, Typography } from '@mui/material';

export const Header = () => (
  <>
    <AppBar position="sticky" sx={{ zIndex: 3 }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            よし歌
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  </>
);
