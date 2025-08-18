import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
  readingTime: true,
  search: true,
  codeHighlight: true,
  whiteListTagsStyling: ["table", "thead", "tbody", "tr", "th", "td"],
});

export const createMDXConfig = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require("remark-math")],
    rehypePlugins: [require("rehype-katex")],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: "export",
  pageExtensions: ["mdx", "tsx", "ts"],
  allowedDevOrigins: [process.env.NEXT_PUBLIC_UI_URL!],
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: true,
  },
  ...createMDXConfig,
} satisfies NextConfig;

export default withNextra(nextConfig);
