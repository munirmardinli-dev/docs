'use client';
import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/lib/googleTag';
import '@/lib/dayjs';
import ClientLocalizationProvider from '@/lib/clientLocalizationProvider';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import getEnv from '@/lib/env';
import theme from '@/utils/theme';
import { FontCompany } from '@/lib/font';
import '@/app/_metadata';
import { cacheLtr, cacheRtl } from '@/utils/cache';
import { AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import { Suspense } from 'react';
import { Head } from 'nextra/components/head';
import { Search } from 'nextra/components/search';
import { CacheProvider } from '@emotion/react';

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const sidebarData = await getPageMap();
	let direction = 'ltr';
	return (
		<html
			lang="en"
			className={`${FontCompany.className}`}
			dir={theme().direction}
			suppressHydrationWarning
		>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="sitemap"
					type="application/xml"
					href={`${getEnv().NEXT_PUBLIC_UI_URL}/sitemap.xml`}
				/>
				<link
					rel="manifest"
					href={`${getEnv().NEXT_PUBLIC_UI_URL}/manifest.webmanifest`}
				/>
				<meta name="robots" content="index, follow" />
				<meta name="theme-color" content="#000000" />
				<GoogleTagManager />
			</Head>
			<body className="antialiased tracking-tight">
				<GoogleTagManagerNoScript />
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
				<StyledEngineProvider enableCssLayer>
					<CacheProvider
						value={theme().direction === 'rtl' ? cacheRtl : cacheLtr}
					>
						<ThemeProvider
							theme={theme()}
							defaultMode="system"
							colorSchemeStorageKey="theme"
						>
							<Suspense  fallback={<div>Loading...</div>} name='layout'>
							<Layout
								sidebar={{ autoCollapse: true }}
								navbar={
									<Navbar
										logoLink="/docs"
										projectLink={getEnv().NEXT_PUBLIC_UI_URL}
										logo={
											<span style={{ marginLeft: '.4em', fontWeight: 800 }}>
												{getEnv().NEXT_PUBLIC_HEADER_TITEL}
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
									{children}
								</ClientLocalizationProvider>
							</Layout>
							</Suspense>
						</ThemeProvider>
					</CacheProvider>
					</StyledEngineProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
