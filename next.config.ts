import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
  latex: true,
  readingTime: true,
  search: true,
});

export default withNextra({
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
