import { ReactNode } from 'react';

import { MuiProvider } from './ThemeProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <MuiProvider>{children}</MuiProvider>
);
