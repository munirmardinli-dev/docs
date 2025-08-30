import { DataGrid,gridClasses } from '@mui/x-data-grid';
import {alpha,styled } from '@mui/material/styles';

const ODD_OPACITY = 0.2;

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
	width: '100%',
	height: '49vh',
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: theme.palette.grey[200],
		'&:hover': {
			backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
			'@media (hover: none)': {
				backgroundColor: 'transparent',
			},
		},
		'&.Mui-selected': {
			backgroundColor: alpha(
				theme.palette.primary.main,
				ODD_OPACITY + theme.palette.action.selectedOpacity
			),
			'&:hover': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					ODD_OPACITY +
						theme.palette.action.selectedOpacity +
						theme.palette.action.hoverOpacity
				),
				'@media (hover: none)': {
					backgroundColor: alpha(
						theme.palette.primary.main,
						ODD_OPACITY + theme.palette.action.selectedOpacity
					),
				},
			},
		},
		...theme.applyStyles('dark', {
			backgroundColor: theme.palette.grey[800],
		}),
	},
}));
