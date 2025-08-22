import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const PRODUCTION_DOMIN = process.env.NEXT_PUBLIC_UI_URL!;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/privacy", "/user/*"],
    },
    sitemap: PRODUCTION_DOMIN + `/sitemap.xml`,
    host: PRODUCTION_DOMIN,
  };
}
