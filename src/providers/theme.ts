'use client';

import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#cb3b3c',
    },
  },
});

export default muiTheme;
