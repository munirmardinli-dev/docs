'use client';
import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/lib/googleTag';
import DayjsManager from '@/lib/dayjs';
import ClientLocalizationProvider from '@/lib/clientLocalizationProvider';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import EnvManager from '@/lib/env';
import theme from '@/utils/theme';
import FontManager from '@/lib/font';
import '@/app/_metadata';
import CacheManager from '@/utils/cache';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Suspense } from 'react';
import { Head } from 'nextra/components/head';
import { Search } from 'nextra/components/search';
import { CacheProvider } from '@emotion/react';

DayjsManager.initialize();

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const env = EnvManager.getEnv<string>();
	const sidebarData = await getPageMap();
	return (
		<html
			lang="en"
			className={`${FontManager.FontCompany.className}`}
			dir={theme().direction}
			suppressHydrationWarning
		>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="sitemap"
					type="application/xml"
					href={`${env.NEXT_PUBLIC_UI_URL}/sitemap.xml`}
				/>
				<link
					rel="manifest"
					href={`${env.NEXT_PUBLIC_UI_URL}/manifest.webmanifest`}
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
							value={theme().direction === 'rtl' ? CacheManager.cacheRtl : CacheManager.cacheLtr}
						>
							<ThemeProvider
								theme={theme()}
								defaultMode="system"
								colorSchemeStorageKey="theme"
							>
								<Suspense fallback={<div>Loading...</div>} name="layout">
									<Layout
										sidebar={{ autoCollapse: true }}
										navbar={
											<Navbar
												logoLink="/docs"
												projectLink={env.NEXT_PUBLIC_UI_URL}
												logo={
													<span style={{ marginLeft: '.4em', fontWeight: 800 }}>
														{env.NEXT_PUBLIC_HEADER_TITEL}
													</span>
												}
												align="left"
											/>
										}
										docsRepositoryBase={`${env.NEXT_PUBLIC_GIT_REPO_URL}/docs`}
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
