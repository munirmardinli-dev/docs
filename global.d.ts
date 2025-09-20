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

	// ===== TODO-TYPEN =====
	interface TodoItem {
		id: number;
		title: string;
		description?: string;
		done: boolean;
		createdAt: string;
		dueDate?: string;
		priority?: 'low' | 'medium' | 'high';
	}

	interface TodoState {
		todos: TodoItem[];
		loading: boolean;
		error: string | null;
		dateFilter: 'all' | 'today' | 'week' | 'overdue';
		currentPage: number;
		pageSize: number;
	}

	interface TodoData extends JsonData {
		todos: TodoItem[];
	}

	interface TodoProps {
		filename?: string;
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

	// ===== CV-TYPEN =====

	// Gemeinsames Interface für Adressdaten
	interface AddressData {
		zipCity?: string | null;
		address?: string | null;
	}

	interface User {
		image?: string | null;
		firstName?: string | null;
		lastName?: string | null;
		mail?: string | null;
	}

	interface Transmitter extends AddressData {
		phone?: string | null;
	}

	interface CompetenceItem {
		key1?: string | null;
		key2?: string | null;
	}

	interface Recipient extends AddressData {
		name?: string | null;
		gender?: string | null;
		companyName?: string | null;
		contactPerson?: boolean | null;
	}

	interface ApplicationLetter {
		salutation?: string | null;
		farewellFormula?: string | null;
		subject?: string | null;
		recipient?: Recipient | null;
	}

	interface CvType {
		contactCaption?: string | null;
		languagesCaption?: string | null;
		mediacompetenceCaption?: string | null;
		socialCompetenceCaption?: string | null;
		socialMediaCaption?: string | null;
		hobbiesCaption?: string | null;
		aboutMeCaption?: string | null;
		aboutMeText?: string | null;
		workExperienceCaption?: string | null;
		schoolEducationCaption?: string | null;
		practisCaption?: string | null;

		language?: CompetenceItem[] | null;
		mediaCompetence?: CompetenceItem[] | null;
		socialCompetence?: CompetenceItem[] | null;
		socialMedia?: CompetenceItem[] | null;
		hobbies?: CompetenceItem[] | null;
		workExperience?: CompetenceItem[] | null;
		schoolEducation?: CompetenceItem[] | null;
		practis?: CompetenceItem[] | null;
	}

	// Interface für Events (aus der JSON)
	interface EventItem {
		message?: string | null;
	}

	interface CoverSheet {
		suggestion?: string | null;
		attachmentCaption?: string | null;
		attachments?: Attachment[] | null;
		documents?: Document[] | null;
		required?: Required | null;
	}

	interface Attachment {
		name?: string | null;
	}

	interface Document {
		url?: string | null;
	}

	interface Required {
		applicationLetter?: boolean | null;
		cv?: boolean | null;
		attachments?: boolean | null;
		coverSheet?: boolean | null;
	}

	interface CvProps extends JsonData {
		user?: User | null;
		transmitter?: Transmitter | null;
		cv?: CvType | null;
		applicationLetter?: ApplicationLetter | null;
		events?: EventItem[] | null;
		message?: string | null;
		coverSheet?: CoverSheet | null;
	}
}

export { };

declare module '*.png' {
	const value: string;
	export = value;
}
