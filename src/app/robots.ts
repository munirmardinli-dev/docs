import type { MetadataRoute } from 'next/types';
import packageJson from 'package.json';
export const dynamic = 'force-static';

class RobotsManager {
	static generateRobots(): MetadataRoute.Robots {
		return {
			rules: {
				userAgent: '*',
				allow: ['/'],
				disallow: ['/admin', '/privacy', '/user/*'],
			},
			sitemap: packageJson.preview.uiUrl + `/sitemap.xml`,
			host: packageJson.preview.uiUrl,
		};
	}
}

export default function robots(): MetadataRoute.Robots {
	return RobotsManager.generateRobots();
}
