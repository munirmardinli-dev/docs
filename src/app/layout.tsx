import "./globals.css";
import { Inter } from "next/font/google";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import "nextra-theme-docs/style.css";
import "katex/dist/katex.min.css";
import db from "../db";
import { SearchWithCallback } from "../components/search";
import { Metadata } from "next";
//import localFont from 'next/font/local';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_UI_URL!),
  title: db.headerTitel,
  description:
    "Documentation tools and utilities for Munir Mardinli's projects",
};

/*  const FontCampany = localFont({
  src: '../font/Kavivanar-Regular.ttf',
  display: 'auto',
}); */
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className}`}
      dir="ltr"
      suppressHydrationWarning
    >
      <Head
        color={{
          hue: 0,
          saturation: 0,
          lightness: {
            light: 50,
            dark: 100,
          },
        }}
        faviconGlyph="✦"
      />
      <body className="antialiased tracking-tight">
        <Layout
          sidebar={{ autoCollapse: true }}
          search={<SearchWithCallback key={"SearchWithCallback"} />}
          navbar={
            <Navbar
              logoLink="/"
              align="right"
              projectLink={db.projectLink}
              logo={
                <>
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M14.683 14.828a4.055 4.055 0 0 1-1.272.858a4.002 4.002 0 0 1-4.875-1.45l-1.658 1.119a6.063 6.063 0 0 0 1.621 1.62a5.963 5.963 0 0 0 2.148.903a6.035 6.035 0 0 0 3.542-.35a6.048 6.048 0 0 0 1.907-1.284c.272-.271.52-.571.734-.889l-1.658-1.119a4.147 4.147 0 0 1-.489.592z M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 2c2.953 0 5.531 1.613 6.918 4H5.082C6.469 5.613 9.047 4 12 4zm0 16c-4.411 0-8-3.589-8-8c0-.691.098-1.359.264-2H5v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2h2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1h.736c.166.641.264 1.309.264 2c0 4.411-3.589 8-8 8z"
                    />
                  </svg>
                  <span style={{ marginLeft: ".4em", fontWeight: 800 }}>
                    {db.headerTitel}
                  </span>
                </>
              }
            />
          }
          docsRepositoryBase={`${db.projectLink}/blob/main/docs`}
          footer={<Footer>MIT {new Date().getFullYear()} © Nextra.</Footer>}
          darkMode={true}
          navigation={true}
          pageMap={require("../pageMap.json")}
          editLink={true}
          nextThemes={{
            attribute: "class",
            defaultTheme: "dark",
            disableTransitionOnChange: true,
            storageKey: "theme",
            forcedTheme: "dark",
          }}
        >
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8 dark:bg-zinc-950 bg-white text-gray-900 dark:text-zinc-200">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              {children}
            </main>
          </div>
        </Layout>
      </body>
    </html>
  );
}
