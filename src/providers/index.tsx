'use client';

import { ReactNode } from 'react';
import { EmotionProvider } from './Emotion';
import { MuiProvider } from './ThemeProvider';

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MuiProvider>
      <EmotionProvider>{children}</EmotionProvider>
    </MuiProvider>
  );
};
