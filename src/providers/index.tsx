import { ReactNode } from 'react';

import { MuiProvider } from './themeProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => (
  <MuiProvider>{children}</MuiProvider>
);
