import { ReactNode } from 'react';

import { MainLayout } from '@/components/mainLayout';
import AppProvider from '@/providers';

export const metadata = {
  title: 'yoshika music',
  description:
    'yoshika music collected by youtube and twitch, if you want to upload. please check it',
  robots: {
    index: false, // noindexの設定
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="ja">
    <body>
      <AppProvider>
        <MainLayout>{children}</MainLayout>
      </AppProvider>
    </body>
  </html>
);
export default RootLayout;
