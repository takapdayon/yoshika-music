'use client';

import { Box } from '@mui/material';
import { memo, ReactNode } from 'react';
import { Header } from './Header';

export const MainLayout = memo(({ children }: { children: ReactNode }) => (
  <Box>
    <Header />
    <Box sx={{ mt: 10 }}>{children}</Box>
  </Box>
));
