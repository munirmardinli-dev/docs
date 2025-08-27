import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import type {} from '@mui/x-date-pickers/themeAugmentation';
//import type {} from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@/lib/theme';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head, Search } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Metadata } from 'next';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/lib/googleTag';
import { Fragment_Mono } from 'next/font/google';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import { Suspense } from 'react';
import '@/lib/dayjs';
import ClientLocalizationProvider from '@/lib/clientLocalizationProvider';
import getEnv from '@/lib/env';

export const metadata: Metadata = {
	metadataBase: new URL(getEnv().NEXT_PUBLIC_UI_URL),
	title: '%s',
	description: '%s',
};

const FontCompany: NextFontWithVariable = Fragment_Mono({
	weight: ['400'],
	subsets: ['latin'],
	preload: true,
	display: 'swap',
	variable: '--font-fragment-mono',
	style: ['normal', 'italic'],
	adjustFontFallback: true,
});

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const sidebarData = await getPageMap();
	

	return (
		<html
			lang="en"
			className={`${FontCompany.className}`}
			dir="ltr"
			suppressHydrationWarning
		>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="sitemap"
					type="application/xml"
					href={`${getEnv().NEXT_PUBLIC_UI_URL}/sitemap.xml`}
				/>
				<link rel="manifest" href={`${getEnv().NEXT_PUBLIC_UI_URL}/manifest.webmanifest`} />
				<meta name="robots" content="index, follow" />
				<GoogleTagManager />
			</Head>
			<body className="antialiased tracking-tight">
				<GoogleTagManagerNoScript />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					enableColorScheme
					storageKey="theme"
				>
					<Layout
						sidebar={{ autoCollapse: true }}
						navbar={
							<Navbar
								logoLink="/docs"
								projectLink={getEnv().NEXT_PUBLIC_UI_URL}
								logo={
									<span style={{ marginLeft: '.4em', fontWeight: 800 }}>
										{getEnv().NEXT_PUBLIC_UI_URL}
									</span>
								}
								align="left"
							/>
						}
						docsRepositoryBase={`${getEnv().NEXT_PUBLIC_GIT_REPO_URL}/docs`}
						pageMap={sidebarData}
						feedback={{ content: null }}
						search={<Search placeholder="Suche..." />}
						editLink={false}
					>
						<ClientLocalizationProvider>
							<Suspense>{children}</Suspense>
						</ClientLocalizationProvider>
					</Layout>
				</ThemeProvider>
			</body>
		</html>
	);
}
