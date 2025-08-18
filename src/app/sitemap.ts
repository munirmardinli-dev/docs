import { promises as fs } from "fs";
import path from "path";
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_UI_URL!;
const DynamicSlug: string = "(slug)";
const directory: string = path.join(process.cwd(), "src/app", DynamicSlug);

async function getNoteSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isFile() && entry.name === "page.mdx")
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name),
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

export default async function sitemap() {
  const notesDirectory = directory;
  const slugs = await getNoteSlugs(notesDirectory);

  const notes = slugs.map((slug) => ({
    url: `${SITE_URL}/${DynamicSlug}/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [...notes];
}
