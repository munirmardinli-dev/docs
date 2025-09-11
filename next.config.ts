import nextra from 'nextra';

const withNextra = nextra({
	defaultShowCopyCode: true,
	codeHighlight: true,
	readingTime: true,
	staticImage: true,
	search: true,
	latex: {
		renderer: 'katex',
		options: {
			macros: {
				'\\RR': '\\mathbb{R}',
			},
		},
	},
	whiteListTagsStyling: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
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
		domains: [process.env.NEXT_PUBLIC_UI_URL, process.env.NEXT_PUBLIC_HOMELAB_URL],
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
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
	},
});
