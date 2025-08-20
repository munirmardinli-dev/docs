import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
   latex: {
    renderer: 'katex',
    options: {
      macros: {
        '\\RR': '\\mathbb{R}'
      },
    }
  },
  whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
  readingTime: true,
  search: { codeblocks: false }
});

export default withNextra({
  images: {
    unoptimized: true // mandatory, otherwise won't export
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/docs",
        permanent: true,
      }
    ];
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.js'
    }
  }
});
