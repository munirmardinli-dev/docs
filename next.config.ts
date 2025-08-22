import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
  readingTime: false,
  latex: {
    renderer: 'katex',
    options: {
      macros: {
        '\\RR': '\\mathbb{R}'
      },
    }
  }
});

export default withNextra({
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
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
      'next-mdx-import-source-file': './mdx-components.tsx'
    }
  }
});
