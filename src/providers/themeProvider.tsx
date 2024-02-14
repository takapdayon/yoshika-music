import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode } from 'react';

import muiTheme from './theme';

export const MuiProvider = ({ children }: { children: ReactNode }) => (
  <AppRouterCacheProvider>
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </AppRouterCacheProvider>
);
