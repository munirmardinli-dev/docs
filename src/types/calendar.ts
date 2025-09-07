import { DayLayoutAlgorithm, Event } from 'react-big-calendar';

export interface CalendarEvent extends Event {
	title: string;
	start: Date;
	end: Date;
}

export interface RBCCalendarProps {
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
