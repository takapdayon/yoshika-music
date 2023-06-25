// src/app/MuiSetup.tsx

'use client';

import {
  createTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import { ReactNode } from 'react';

const muiTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
});

export const MuiProvider = ({ children }: { children: ReactNode }) => (
  <MuiThemeProvider theme={muiTheme}>
    <CssBaseline />
    {children}
  </MuiThemeProvider>
);
