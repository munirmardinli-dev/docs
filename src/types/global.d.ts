import { DayLayoutAlgorithm, Event } from 'react-big-calendar';

declare global {
	interface QuoteProps {
		children: React.ReactNode;
		author?: string;
		source?: string;
		sourceUrl?: string;
		variant?: 'default' | 'highlighted' | 'minimal';
	}
	interface CalendarEvent extends Event {
		title: string;
		start: Date;
		end: Date;
	}
	interface RBCCalendarProps {
		props: {
			locale: string;
			key: string;
			dayLayoutAlgorithm: DayLayoutAlgorithm;
			messages: object;
			title?: string;
			end?: Date;
			start?: Date;
			events: CalendarEvent[];
		};
	}
	interface PlotSegment {
		x: number[];
		y: number[];
		mode: 'lines' | 'markers' | 'lines+markers';
		name: string;
		line?: {
			dash?: 'solid' | 'dot' | 'dash' | 'longdash' | 'dashdot' | 'longdashdot';
			width?: number;
			color?: string;
		};
	}

	interface JumpPoint {
		x: number;
		yStart: number;
		yEnd: number;
		name: string;
		lineStyle?: {
			dash?: 'solid' | 'dot' | 'dash' | 'longdash' | 'dashdot' | 'longdashdot';
			width?: number;
			color?: string;
		};
	}

	interface PlotlyGraphProps {
		segments: PlotSegment[];
		jumpPoints?: JumpPoint[];
		title?: string;
		xAxis?: {
			title?: string;
			range?: [number, number];
		};
		yAxis?: {
			title?: string;
			range?: [number, number];
		};
		width?: string | number;
		height?: string | number;
		className?: string;
	}

	// Plotly Typen definieren
	interface Plotly {
    react(arg0: string, data: PlotlyData[], layout: Partial<PlotlyLayout>): unknown;
		newPlot: (divId: string, data: PlotlyData[], layout: PlotlyLayout) => void;
	}

	interface PlotlyData {
		x: number[];
		y: number[];
		mode: string;
		name: string;
		type: string;
		line?: {
			dash?: string;
			width?: number;
			color?: string;
		};
	}

	interface PlotlyLayout {
		title: string;
		xaxis: {
			title: string;
			range: [number, number];
		};
		yaxis: {
			title: string;
			range: [number, number];
		};
		width: string | number;
		height: string | number;
	}
	interface Window {
		Plotly: Plotly;
	}
}

export {};

declare module '*.png' {
	const value: string;
	export = value;
}
