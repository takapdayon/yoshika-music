// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { ReactNode, useState } from 'react';

export const EmotionProvider = ({ children }: { children: ReactNode }) => {
  const [cache] = useState(() => {
    const ca = createCache({ key: 'css' });
    ca.compat = true;
    return ca;
  });

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
};
