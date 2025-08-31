'use client';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { dayjsLocalizer, Views, Event } from 'react-big-calendar';
import React from 'react';
import DayjsManager from '@/lib/dayjs';
import { Stack } from '@mui/material';
import { type CalendarEvent, type RBCCalendarProps } from '@/types/calendar';
import CalendarStyleManager from '@/styles/calendar';

export default class MyCalendar extends React.Component<RBCCalendarProps> {
	constructor(props: RBCCalendarProps) {
		super(props);
	}

	startAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.start ? new Date(calendarEvent.start) : new Date();
	};

	endAccessor = (event: Event) => {
		const calendarEvent = event as CalendarEvent;
		return calendarEvent.end ? new Date(calendarEvent.end) : new Date();
	};

	render() {
		const {
			locale,
			key,
			dayLayoutAlgorithm,
			messages,
			title,
			end,
			start,
			events = [],
		} = this.props.props;

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

		return (
			<Stack direction="column" spacing={1}>
				<CalendarStyleManager.StyledCalendar
					localizer={dayjsLocalizer(DayjsManager.instance)}
					events={calendarEvents}
					messages={messages}
					startAccessor={this.startAccessor}
					endAccessor={this.endAccessor}
					style={{
						height: 500,
						maxWidth: '100%',
						paddingTop: '25px',
					}}
					defaultDate={DayjsManager.instance(new Date()).toDate()}
					dayLayoutAlgorithm={dayLayoutAlgorithm}
					key={key}
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
