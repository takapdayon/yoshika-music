import { ReactNode } from 'react';

export const metadata = {
  title: 'yoshika music',
  description:
    'yoshika music collected by youtube and twitch, if you want to upload. please check it',
  robots: {
    index: false, // noindexの設定
  },
};

const Layout = ({ children }: { children: ReactNode }) => <>{children}</>;
export default Layout;
