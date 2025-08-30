'use client';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';
import dayjs from '@/lib/dayjs';
import { Stack } from '@mui/material';
import { type CalendarEvent, type RBCCalendarProps } from '@/types/calendar';
import { StyledCalendar } from '@/styles/calendar';

export default function MyCalendar({
	props: {
		locale,
		key,
		dayLayoutAlgorithm,
		messages,
		title,
		end,
		start,
		events = [],
	},
}: RBCCalendarProps) {
	const calendarEvents =
		events.length > 0
			? events
			: title && start && end
			? [
					{
						start: dayjs(start).toDate(),
						end: dayjs(end).toDate(),
						title: title,
					},
			  ]
			: [];

	const startAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.start ? new Date(calendarEvent.start) : new Date();
	};

	const endAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.end ? new Date(calendarEvent.end) : new Date();
	};

	return (
		<Stack direction="column" spacing={1}>
			<StyledCalendar
				localizer={dayjsLocalizer(dayjs)}
				events={calendarEvents}
				messages={messages}
				startAccessor={startAccessor}
				endAccessor={endAccessor}
				style={{
					height: 500,
					maxWidth: '100%',
					paddingTop: '25px',
				}}
				defaultDate={dayjs(new Date()).toDate()}
				dayLayoutAlgorithm={dayLayoutAlgorithm}
				key={key}
				culture={dayjs.locale(locale)}
				min={dayjs().hour(8).minute(0).toDate()}
				max={dayjs().hour(23).minute(0).toDate()}
				formats={{ dayHeaderFormat: 'DD.MM.YYYY' }}
				views={[Views.WORK_WEEK, Views.MONTH]}
				defaultView={Views.MONTH}
				rtl={dayjs.locale(locale) === 'ar'}
				step={60}
				enableAutoScroll
				selectable
				popup
				doShowMoreDrillDown
			/>
		</Stack>
	);
}
