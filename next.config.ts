import nextra from "nextra";

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
    unoptimized: true
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
