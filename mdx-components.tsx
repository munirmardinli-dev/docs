import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import Quote from '@/components/quote';
import PlotlyGraph from '@/components/plotlyGraph';
import MyCalendar from '@/components/calendar';
import { Callout } from 'nextra/components'
import Todo from '@/components/todo';
import CVSettings from '@/components/cvSettings';
import ApplicationsJob from '@/components/applicationJob';

const themeComponents = getThemeComponents();

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...themeComponents,
		...components,
		img: (props: ImageProps) => (
			<Image
				{...props}
				priority
				src={props.src}
				alt={props.alt}
				sizes="100vw"
				style={{
					objectFit: 'cover',
				}}
				loading="lazy"
				placeholder="blur"
				fill
			/>
		),
		Quote,
		PlotlyGraph,
		MyCalendar,
		Callout,
		Todo,
		CVSettings,
		ApplicationsJob,
	};
}
