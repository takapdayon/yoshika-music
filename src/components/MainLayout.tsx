'use client';

import { Box } from '@mui/material';
import { memo, ReactNode } from 'react';
import { Header } from './Header';

export const MainLayout = memo(({ children }: { children: ReactNode }) => (
  <Box sx={{ display: 'flex' }}>
    <Header />
    {children}
  </Box>
));
