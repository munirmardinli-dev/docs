'use client';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
	dayjsLocalizer,
	Views,
	Event,
} from 'react-big-calendar';
import React from 'react';
import DayjsManager from '@/lib/dayjs';
import { Stack } from '@mui/material';
import CalendarStyleManager from '@/styles/calendar';
import { get } from '@/stores/get';
import CalendarMessages from '@/public/data/calendar.json';

/**
 * Eine erweiterte Kalender-Komponente basierend auf react-big-calendar
 * Unterstützt sowohl Standard-Modus als auch Store-Modus mit filename
 *
 * @example
 * ```tsx
 * // Standard-Modus
 * <MyCalendar
 *   props={{
 *     locale: 'de',
 *     events: [
 *       { start: new Date(), end: new Date(), title: 'Meeting' }
 *     ]
 *   }}
 * />
 *
 * // Store-Modus
 * <MyCalendar filename="workCalendar.json" />
 * ```
 */
export default class MyCalendar extends React.Component<MyCalendarProps> {
	state = {
		calendarData: null as CalendarData | null,
	};

	constructor(props: MyCalendarProps) {
		super(props);
	}

	componentDidMount() {
		if (this.props.filename) {
			this.loadData();
		}
	}

	componentDidUpdate(prevProps: MyCalendarProps) {
		if (this.props.filename && this.props.filename !== prevProps.filename) {
			this.loadData();
		}
	}

	loadData = async () => {
		if (!this.props.filename) return;

		try {
			const data = await get<CalendarData>(this.props.filename);
			this.setState({ calendarData: data, error: null });
		} catch (err) {
			this.setState({
				error: err instanceof Error ? err.message : 'Unbekannter Fehler',
				calendarData: null,
			});
		}
	};

	/**
	 * Extrahiert das Startdatum aus einem Kalender-Event
	 * @param event - Das Event-Objekt von react-big-calendar
	 * @returns Das Startdatum als Date-Objekt
	 */
	startAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.start ? new Date(calendarEvent.start) : new Date();
	};

	/**
	 * Extrahiert das Enddatum aus einem Kalender-Event
	 * @param event - Das Event-Objekt von react-big-calendar
	 * @returns Das Enddatum als Date-Objekt
	 */
	endAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.end ? new Date(calendarEvent.end) : new Date();
	};

	render() {
		if (this.props.filename) {
			return this.renderStoreMode();
		}

		if (this.props.props) {
			return this.renderStandardMode();
		}
	}

	renderStoreMode() {
		const { calendarData } = this.state;
		const {
			filename,
			locale = 'de',
			key: calendarKey = 'default',
			dayLayoutAlgorithm = 'no-overlap',
		} = this.props;

		if (!calendarData) {
			return <>loading...</>;
		}

		return this.renderCalendar({
			locale,
			key: calendarKey,
			dayLayoutAlgorithm,
			events: calendarData.events.map((event) => ({
				...event,
				start: new Date(event.start),
				end: new Date(event.end),
			})),
		});
	}

	renderStandardMode() {
		const {
			locale,
			key,
			dayLayoutAlgorithm,
			title,
			end,
			start,
			events = [],
		} = this.props.props!;

		const calendarEvents =
			events.length > 0
				? events
				: title && start && end
				? [
						{
							start: DayjsManager.instance(start).toDate(),
							end: DayjsManager.instance(end).toDate(),
							title: title,
						},
				  ]
				: [];

		return this.renderCalendar({
			locale,
			key,
			dayLayoutAlgorithm,
			events: calendarEvents,
		});
	}

	renderCalendar(props: {
		locale: string;
		key: string;
		dayLayoutAlgorithm: 'no-overlap' | 'overlap';
		events: CalendarEvent[];
	}) {
		const { locale, key, dayLayoutAlgorithm, events } = props;

		return (
			<Stack direction="column" spacing={1}>
				<CalendarStyleManager.StyledCalendar
					localizer={dayjsLocalizer(DayjsManager.instance)}
					events={events}
					messages={CalendarMessages.messages}
					startAccessor={this.startAccessor}
					endAccessor={this.endAccessor}
					style={{
						height: 500,
						maxWidth: '100%',
						paddingTop: '25px',
					}}
					defaultDate={DayjsManager.instance(new Date()).toDate()}
					dayLayoutAlgorithm={dayLayoutAlgorithm}
					key={key + "Calendar"}
					culture={DayjsManager.instance.locale(locale)}
					min={DayjsManager.instance().hour(8).minute(0).toDate()}
					max={DayjsManager.instance().hour(23).minute(0).toDate()}
					formats={{ dayHeaderFormat: 'DD.MM.YYYY' }}
					views={[Views.WORK_WEEK, Views.MONTH]}
					defaultView={Views.MONTH}
					rtl={DayjsManager.instance.locale(locale) === 'ar'}
					step={60}
					enableAutoScroll
					selectable
					popup
					doShowMoreDrillDown
				/>
			</Stack>
		);
	}
}
