import type { MetadataRoute } from 'next/types';

export const dynamic = 'force-static';

class RobotsManager {
	static generateRobots(): MetadataRoute.Robots {
		return {
			rules: {
				userAgent: '*',
				allow: ['/'],
				disallow: ['/admin', '/privacy', '/user/*'],
			},
			sitemap: process.env.NEXT_PUBLIC_UI_URL + `/sitemap.xml`,
			host: process.env.NEXT_PUBLIC_UI_URL,
		};
	}
}

export default function robots(): MetadataRoute.Robots {
	return RobotsManager.generateRobots();
}
