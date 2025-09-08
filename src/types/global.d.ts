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
}

export {};

declare module '*.png' {
	const value: string;
	export = value;
}
