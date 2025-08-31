import { styled } from '@mui/material/styles';
import { Calendar, type CalendarProps } from 'react-big-calendar';

export default class CalendarStyleManager {
	static getStyledCalendar() {
		return styled(Calendar)<CalendarProps>(() => ({
			'.rbc-off-range-bg': {
				background: 'rgb(var(--nextra-bg))',
			},
			'.rbc-off-range': {
				color: '#fff',
			},
			'.rbc-toolbar button': {
				color: '1px solid rgb(var(--nextra-bg))',
			},
			'.rbc-toolbar button:active, .rbc-toolbar button.rbc-active': {
				color: '#000',
			},
			'.rbc-today': {
				backgroundColor: 'transparent',
			},
			// @ts-ignore
			'.rbc-toolbar button:active, .rbc-toolbar button.rbc-active': {
				backgroundColor: '#fff',
				color: '#000',
			},
			'.rbc-toolbar button:hover': {
				backgroundColor: '#fff',
				color: '#000',
			},
		}));
	}

	static StyledCalendar = CalendarStyleManager.getStyledCalendar();
}
