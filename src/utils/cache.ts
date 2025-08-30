'use client';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import createCache from '@emotion/cache';

export const cacheRtl = createCache({
  key: 'mui-rtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

export const cacheLtr = createCache({
  key: 'mui-ltr',
  stylisPlugins: [prefixer],
});
