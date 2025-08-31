import nextra from "nextra";
import EnvManager from "@/lib/env";

const env = EnvManager.getEnv<string>();

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
  readingTime: false,
  staticImage: true,
  latex: {
    renderer: 'katex',
    options: {
      macros: {
        '\\RR': '\\mathbb{R}'
      },
    }
  },
  whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td']
});

export default withNextra({
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  compiler: {
    removeConsole: {
      exclude: ['error'],
    },
  },
  images: {
    unoptimized: true,
    domains: [env.NEXT_PUBLIC_UI_URL]
  },
  /*   async redirects() {
      return [
        {
          source: "/",
          destination: "/docs",
          permanent: true,
        }
      ];
    }, */
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json']
  }
});
