import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

const themeComponents = getThemeComponents();

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...themeComponents,
		...components,
		img: (props: ImageProps) => (
			<Image
				{...props}
				priority
				alt={props.alt}
				width={props.width}
				height={props.height}
			/>
		),
	};
}
