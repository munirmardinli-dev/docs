import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import packageJson from 'package.json';

export const dynamic = 'force-static';

class RSSRouterManager {
	static RSSItem = class {
		title: string;
		description: string;
		author: string;
		date: Date;
		url: string;

		constructor(
			title: string,
			description: string,
			author: string,
			date: Date,
			url: string
		) {
			this.title = title;
			this.description = description;
			this.author = author;
			this.date = date;
			this.url = url;
		}
	};

	static getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
		const files = fs.readdirSync(dir);

		files.forEach((file) => {
			const filePath = path.join(dir, file);
			if (fs.statSync(filePath).isDirectory()) {
				fileList = RSSRouterManager.getAllMdxFiles(filePath, fileList);
			} else if (file.endsWith('.mdx')) {
				fileList.push(filePath);
			}
		});

		return fileList;
	}

	static generateRSS(): void {

		if (packageJson.preview.uiUrl) {
			console.error('UI_URL environment variable is not set');
			return;
		}

		const appDir = path.join(process.cwd(), 'src/app');
		const mdxFiles = RSSRouterManager.getAllMdxFiles(appDir);

		const rssItems: InstanceType<typeof RSSRouterManager.RSSItem>[] = mdxFiles
			.map((filePath) => {
				const content = fs.readFileSync(filePath, 'utf8');
				const { data: frontmatter } = matter(content) as {
					data: {
						title?: string;
						description?: string;
						author?: string;
						date?: string;
					};
				};

				const route = filePath
					.replace(appDir, '')
					.replace(/\.mdx$/, '')
					.replace(/\\/g, '/')
					.replace(/\/page$/, '');

				const url = route === '' ? '/' : route;

				if (!frontmatter.title || !frontmatter.date) {
					return null;
				}

				return new RSSRouterManager.RSSItem(
					frontmatter.title,
					frontmatter.description || '',
					frontmatter.author || 'Unknown',
					new Date(frontmatter.date),
					`${packageJson.preview.uiUrl}${url}`
				);
			})
			.filter(
				(item): item is InstanceType<typeof RSSRouterManager.RSSItem> =>
					item !== null
			)
			.sort((a, b) => b.date.getTime() - a.date.getTime());

		const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${packageJson.name}</title>
    <description>${packageJson.description}</description>
    <link>${packageJson.preview.uiUrl}</link>
    <atom:link href="${packageJson.preview.uiUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>de-DE</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems
			.map(
				(item) => `
    <item>
      <title>${item.title}</title>
      <description>${item.description}</description>
      <link>${item.url}</link>
      <guid>${item.url}</guid>
      <pubDate>${item.date.toUTCString()}</pubDate>
      <author>${item.author}</author>
    </item>`
			)
			.join('')}
  </channel>
</rss>`;

		if (process.env.NODE_ENV !== 'production') {
			const outputPath = path.join(process.cwd(), 'out/rss.xml');
			fs.writeFileSync(outputPath, rssContent);
			console.log('RSS Feed generiert:', outputPath);
		} else {
			console.log('RSS Feed wird in Produktion nicht generiert');
		}
	}
}

// RSS-Generierung beim Import ausführen
RSSRouterManager.generateRSS();
