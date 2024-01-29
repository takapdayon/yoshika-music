'use client';

import { Box } from '@mui/material';
import { memo, ReactNode } from 'react';

import { Header } from './Header';

export const MainLayout = memo(({ children }: { children: ReactNode }) => (
  <Box sx={{ height: '100dvh', width: 1 }}>
    <Header />
    <Box sx={{ pt: 12, height: 1 }}>{children}</Box>
  </Box>
));
