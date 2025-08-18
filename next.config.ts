import 'dotenv/config'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	output: 'export',
	pageExtensions: ['mdx', 'tsx', 'ts'],
	allowedDevOrigins: [process.env.NEXT_PUBLIC_UI_URL!],
	images: {
		unoptimized: true,
	},
	experimental: {
		mdxRs: true
	},
} satisfies NextConfig;

const withMDX = createMDX({});

export default withMDX(nextConfig);
