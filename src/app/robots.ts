import type { MetadataRoute } from "next";
import getEnv from "@/lib/env";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/privacy", "/user/*"],
    },
    sitemap: getEnv().NEXT_PUBLIC_UI_URL + `/sitemap.xml`,
    host: getEnv().NEXT_PUBLIC_UI_URL,
  };
}
