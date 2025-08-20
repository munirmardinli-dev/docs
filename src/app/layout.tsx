import 'dotenv/config'
import { ThemeProvider } from "@/components/theme"
import { Layout, Navbar } from "nextra-theme-docs";
import { Head, Search } from "nextra/components";
import "nextra-theme-docs/style.css";
import 'katex/dist/katex.min.css'
import { getPageMap } from 'nextra/page-map'
import { Metadata } from "next";
import { Logo } from "@/components/logo";
import localFont from 'next/font/local';
import Database from '@/data/db.json';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_UI_URL!),
  title: {
    default: Database.headerTitel,
    template: "%s"
  },
  description: "%s",
};

export const FontCampany = localFont({
  src: '../../public/font/Kavivanar-Regular.ttf',
  display: 'auto',
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
      className={`${FontCampany.className}`}
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
         <link rel="icon" href="/avatar_cropped.png" sizes="any" />
      </Head>
      <body className="antialiased tracking-tight">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Layout
            navbar={
              <Navbar
                logoLink="/docs"
                projectLink={Database.projectLink}
                logo={<Logo />}
              />
            }
            docsRepositoryBase={`${Database.projectLink}/docs`}
            pageMap={sidebarData}
            feedback={{ content: null }}
            search={<Search placeholder="Suche..." />}
          >
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
