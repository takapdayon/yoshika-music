import { ReactNode } from 'react';

import MuiProvider from './themeProvider';

const AppProvider = ({ children }: { children: ReactNode }) => (
  <MuiProvider>{children}</MuiProvider>
);
export default AppProvider;
