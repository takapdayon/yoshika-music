import { Box } from '@mui/material';
import { memo, ReactNode } from 'react';

import { Header } from './header';

export const MainLayout = memo(({ children }: { children: ReactNode }) => (
  <Box sx={{ height: '93dvh', width: 1 }}>
    <Header />
    <Box sx={{ pt: { xs: 'unset', md: 4 }, height: 1 }}>{children}</Box>
  </Box>
));
