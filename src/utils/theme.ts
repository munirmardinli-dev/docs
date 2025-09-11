'use client';
import { createTheme, Direction } from '@mui/material/styles';
import type {} from '@mui/x-data-grid/themeAugmentation';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-date-pickers/AdapterDayjs';
import FontManager from '@/utils/font';
import { bgBG, arSD, deDE, enUS } from '@mui/x-data-grid/locales';
import {
	bgBG as pickersBgBG,
	enUS as pickersEnUS,
	deDE as pickersDeDE,
} from '@mui/x-date-pickers/locales';
import {
	bgBG as coreBgBG,
	arSD as coreArSD,
	deDE as coreDeDE,
	enUS as coreEnUS,
} from '@mui/material/locale';

const baseTheme = createTheme();

const theme = (direction?: Direction) => {
	return createTheme(
		{
			cssVariables: { nativeColor: true },
			modularCssLayers: '@layer theme, base, mui, components, utilities;',
			components: {
				mergeClassNameAndStyle: true,
			},
			direction: direction || 'ltr',
			spacing: 4,
			typography: {
				fontFamily: [
					FontManager.FontCompany.style.fontFamily,
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
				].join(','),
				h3: {
					fontFamily: FontManager.FontCompany.style.fontFamily,
					fontSize: '1.2rem',
					'@media (min-width:600px)': {
						fontSize: '1.5rem',
					},
					[baseTheme.breakpoints.up('md')]: {
						fontSize: '2.4rem',
					},
				},
				body1: {
					fontFamily: FontManager.FontCompany.style.fontFamily,
					fontWeight: 500,
				},
				button: {
					fontFamily: FontManager.FontCompany.style.fontFamily,
					fontStyle: 'italic',
				},
				subtitle1: {
					fontFamily: FontManager.FontCompany.style.fontFamily,
					fontSize: 12,
				},
			},
			colorSchemes: {
				light: {
					palette: {
						DataGrid: {
							bg: '#f8fafc',
							pinnedBg: '#f1f5f9',
							headerBg: '#eaeff5',
						},
					},
				},
				dark: {
					palette: {
						DataGrid: {
							bg: '#334155',
							pinnedBg: '#293548',
							headerBg: '#1e293b',
						},
					},
				},
			},
		},
		bgBG,
		deDE,
		arSD,
		enUS,
		pickersBgBG,
		pickersDeDE,
		pickersEnUS,
		coreBgBG,
		coreArSD,
		coreDeDE,
		coreEnUS
	);
};

export default theme;
