import fs from 'fs';
import type { MetadataRoute } from 'next';
import path from 'path';
import getEnv from '@/lib/env';

export const dynamic = 'force-static';

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      fileList = getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function extractRoutesFromPages(): string[] {
  const appDir = path.join(process.cwd(), 'src/app');
  const files = getAllFiles(appDir);

  const routes = files
    .map((file) => {
      if (
        file.endsWith('layout.tsx') ||
        file.endsWith('not-found.tsx') ||
        file.includes('sitemap')
      ) {
        return null;
      }

      const route = file
        .replace(appDir, '')
        .replace(/\.(tsx|js|ts)$/, '')
        .replace(/\\/g, '/');
      
      if (
        route.startsWith('/_') ||
        route.includes('[') ||
        route.includes(']')
      ) {
        return null;
      }
      
      let cleanedRoute = route.replace(/\/page$/, '');
      
      cleanedRoute = cleanedRoute.replace(/\.mdx$/, '');
      
      return cleanedRoute === '' ? '/' : cleanedRoute;
    })
    .filter((route): route is string => route !== null);

  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getEnv().NEXT_PUBLIC_UI_URL;
  const routes = extractRoutesFromPages();

  const sitemapEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  return sitemapEntries;
}
