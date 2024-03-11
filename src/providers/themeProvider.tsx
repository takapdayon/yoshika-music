import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ReactNode } from 'react';

import { SnackbarProvider } from './snackBarProvider';
import muiTheme from './theme';

const MuiProvider = ({ children }: { children: ReactNode }) => (
  <AppRouterCacheProvider>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <SnackbarProvider>{children}</SnackbarProvider>
    </ThemeProvider>
  </AppRouterCacheProvider>
);
export default MuiProvider;
