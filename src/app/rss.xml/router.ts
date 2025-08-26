import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import PackageJson from '../../../package.json';

export const dynamic = 'force-static';

interface RSSItem {
	title: string;
	description: string;
	author: string;
	date: Date;
	url: string;
}

interface Frontmatter {
	title?: string;
	description?: string;
	author?: string;
	date?: string;
}

function getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		if (fs.statSync(filePath).isDirectory()) {
			fileList = getAllMdxFiles(filePath, fileList);
		} else if (file.endsWith('.mdx')) {
			fileList.push(filePath);
		}
	});

	return fileList;
}

function generateRSS(): void {
	const baseUrl = process.env.NEXT_PUBLIC_UI_URL;

	if (!baseUrl) {
		console.error('NEXT_PUBLIC_UI_URL environment variable is not set');
		return;
	}

	const appDir = path.join(process.cwd(), 'src/app');
	const mdxFiles = getAllMdxFiles(appDir);

	const rssItems: RSSItem[] = mdxFiles
		.map((filePath) => {
			const content = fs.readFileSync(filePath, 'utf8');
			const { data: frontmatter } = matter(content) as { data: Frontmatter };

			const route = filePath
				.replace(appDir, '')
				.replace(/\.mdx$/, '')
				.replace(/\\/g, '/')
				.replace(/\/page$/, '');

			const url = route === '' ? '/' : route;

			if (!frontmatter.title || !frontmatter.date) {
				return null;
			}

			return {
				title: frontmatter.title,
				description: frontmatter.description || '',
				author: frontmatter.author || 'Unknown',
				date: new Date(frontmatter.date),
				url: `${baseUrl}${url}`,
			};
		})
		.filter((item): item is RSSItem => item !== null)
		.sort((a, b) => b.date.getTime() - a.date.getTime());

	const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${PackageJson.name}</title>
    <description>${PackageJson.description}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
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

generateRSS();
