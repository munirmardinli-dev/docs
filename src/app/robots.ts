import EnvManager from '@/lib/env';
import type { MetadataRoute } from 'next/types';

export const dynamic = 'force-static';

class RobotsManager {
	static generateRobots(): MetadataRoute.Robots {
		const env = EnvManager.getEnv<string>();
		return {
			rules: {
				userAgent: '*',
				allow: ['/'],
				disallow: ['/admin', '/privacy', '/user/*'],
			},
			sitemap: env.NEXT_PUBLIC_UI_URL + `/sitemap.xml`,
			host: env.NEXT_PUBLIC_UI_URL,
		};
	}
}

export default function robots(): MetadataRoute.Robots {
	return RobotsManager.generateRobots();
}
