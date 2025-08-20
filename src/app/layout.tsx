import { ThemeProvider } from "@/components/theme"
import { Inter } from "next/font/google";
import { Layout, Navbar } from "nextra-theme-docs";
import { Head, Search } from "nextra/components";
import "nextra-theme-docs/style.css";
import { getPageMap } from '@/lib/get-page-map';
import db from "@/db";
import { Metadata } from "next";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_UI_URL!),
  title: {
    default: db.headerTitel,
    template: "%s"
  },
  description: "%s",
};

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarData = await getPageMap();
  return (
    <html
      lang="en"
      className={`${inter.className}`}
      dir="ltr"
      suppressHydrationWarning
    >
      <Head />
      <body className="antialiased tracking-tight">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Layout
            navbar={
              <Navbar
                logoLink="/docs"
                projectLink={db.projectLink}
                logo={<Logo />}
              />
            }
            docsRepositoryBase={`${db.projectLink}/docs/blob/main/`}
            pageMap={sidebarData}
            feedback={{
              content: "Question? Give us feedback",
              labels: "feedback",
              link: "https://github.com/munirmardinli-dev/docs/issues",
            }}
            search={<Search placeholder="Suche..." />}
            toc={{
              backToTop: "Zurück zum Anfang",
              title: "Inhaltsverzeichnis",
              //extraContent: <Search placeholder="Suche..." />,
              float: true,
            }}
          >
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
