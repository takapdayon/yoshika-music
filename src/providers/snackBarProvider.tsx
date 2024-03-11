'use client';

import { SnackbarProvider as NsSnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

export interface SnackbarOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export const SnackbarProvider = ({ children }: { children: ReactNode }) => (
  <NsSnackbarProvider
    autoHideDuration={3000}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    {children}
  </NsSnackbarProvider>
);
