// src/app/MuiSetup.tsx
'use client';

import { createTheme } from '@mui/material';

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

const muiTheme = createTheme({
  typography: {
    fontFamily: ['Noto Sans JP', 'sans-serif'].join(','),
  },
});

export const MuiProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
