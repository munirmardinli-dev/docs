'use client';
import 'nextra-theme-docs/style.css';
import 'katex/dist/katex.min.css';
import { Layout, Navbar } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import { Head } from 'nextra/components/head';
import { Search } from 'nextra/components/search';
import { ThemeProvider } from '@mui/material/styles';
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/utils/googleTag';
import DayjsManager from '@/utils/dayjs';
import ClientLocalizationProvider from '@/utils/clientLocalizationProvider';
import theme from '@/utils/theme';
import FontManager from '@/utils/font';
import '@/app/_metadata';
import packageJson from 'package.json';
import { CssBaseline } from '@mui/material';

DayjsManager.initialize();

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const sidebarData = await getPageMap();
	return (
		<html
			lang="en"
			className={`${FontManager.FontCompany.className}`}
			dir={theme().direction}
			suppressHydrationWarning
		>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					rel="sitemap"
					type="application/xml"
					href={`${process.env.NEXT_PUBLIC_UI_URL}/sitemap.xml`}
				/>
				<link
					rel="manifest"
					href={`${process.env.NEXT_PUBLIC_UI_URL}/manifest.webmanifest`}
				/>
				<meta name="robots" content="index, follow" />
				<meta name="theme-color" content="#000000" />
				<GoogleTagManager />
			</Head>
			<body className="antialiased tracking-tight">
				<GoogleTagManagerNoScript />
				<ThemeProvider theme={theme()} defaultMode="system">
					<CssBaseline />
					<Layout
						sidebar={{ autoCollapse: true }}
						navbar={
							<Navbar
								logoLink="/"
								projectLink={packageJson.preview.repoUrl}
								logo={
									<span style={{ marginLeft: '.4em', fontWeight: 800 }}>
										{packageJson.preview.headerTitel}
									</span>
								}
								align="left"
							/>
						}
						docsRepositoryBase={packageJson.preview.repoUrl}
						pageMap={sidebarData}
						feedback={{ content: null }}
						search={<Search placeholder="Suche..." />}
						editLink={false}
					>
						<ClientLocalizationProvider>{children}</ClientLocalizationProvider>
					</Layout>
				</ThemeProvider>
			</body>
		</html>
	);
}
