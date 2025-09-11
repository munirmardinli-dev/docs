import { DayLayoutAlgorithm, Event } from 'react-big-calendar';

declare global {
	// ===== BASIS-TYPEN =====
	type JsonData = Record<string, unknown>;
	type CalendarType = 'work' | 'hobbies' | 'calendar';

	// ===== KALENDER-TYPEN =====
	interface CalendarEvent extends Event {
		title: string;
		start: Date;
		end: Date;
		label?: string;
		description?: string;
	}

	interface CalendarData extends JsonData {
		events: CalendarEvent[];
	}

	// ===== STORE-TYPEN =====
	interface FileStore {
		get: <T extends JsonData = JsonData>(filename: string) => Promise<T>;
	}

	// ===== KALENDER-PROPS =====
	interface BaseCalendarProps {
		locale: string;
		key: string;
		dayLayoutAlgorithm: DayLayoutAlgorithm;
		messages: object;
		title?: string;
		end?: Date;
		start?: Date;
		events: CalendarEvent[];
	}

	// Legacy Interface für Rückwärtskompatibilität
	interface RBCCalendarProps {
		props: BaseCalendarProps;
	}

	// Haupt-Interface für MyCalendar - unterstützt beide Modi
	interface MyCalendarProps {
		// Store-Modus: filename für automatisches Laden
		filename?: string;
		// Standard-Modus: direkte Props
		props?: BaseCalendarProps;
		// Zusätzliche Props für Store-Modus
		locale?: string;
		key?: string;
		dayLayoutAlgorithm?: DayLayoutAlgorithm;
	}

	// ===== ANDERE KOMPONENTEN =====
	interface QuoteProps {
		children: React.ReactNode;
		author?: string;
		source?: string;
		sourceUrl?: string;
		variant?: 'default' | 'highlighted' | 'minimal';
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
		react(
			arg0: string,
			data: PlotlyData[],
			layout: Partial<PlotlyLayout>
		): unknown;
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
