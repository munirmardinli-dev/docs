'use client';
import { prefixer } from 'stylis';
import rtlPlugin from '@mui/stylis-plugin-rtl';
import createCache from '@emotion/cache';

export default class CacheManager {
	static createRtlCache() {
		return createCache({
			key: 'mui-rtl',
			stylisPlugins: [prefixer, rtlPlugin],
		});
	}

	static createLtrCache() {
		return createCache({
			key: 'mui-ltr',
			stylisPlugins: [prefixer],
		});
	}

	static cacheRtl = CacheManager.createRtlCache();
	static cacheLtr = CacheManager.createLtrCache();
}
