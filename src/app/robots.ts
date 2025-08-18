import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/privacy", "/user/*"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_UI_URL!}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_UI_URL!,
  };
}
