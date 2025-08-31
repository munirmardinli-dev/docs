import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';

export default class GridDataStyleManager {
	static ODD_OPACITY = 0.2;

	static getStyledDataGrid() {
		return styled(DataGrid)(({ theme }) => ({
			width: '100%',
			height: '49vh',
			[`& .${gridClasses.row}.even`]: {
				backgroundColor: theme.palette.grey[200],
				'&:hover': {
					backgroundColor: alpha(
						theme.palette.primary.main,
						GridDataStyleManager.ODD_OPACITY
					),
					'@media (hover: none)': {
						backgroundColor: 'transparent',
					},
				},
				'&.Mui-selected': {
					backgroundColor: alpha(
						theme.palette.primary.main,
						GridDataStyleManager.ODD_OPACITY +
							theme.palette.action.selectedOpacity
					),
					'&:hover': {
						backgroundColor: alpha(
							theme.palette.primary.main,
							GridDataStyleManager.ODD_OPACITY +
								theme.palette.action.selectedOpacity +
								theme.palette.action.hoverOpacity
						),
						'@media (hover: none)': {
							backgroundColor: alpha(
								theme.palette.primary.main,
								GridDataStyleManager.ODD_OPACITY +
									theme.palette.action.selectedOpacity
							),
						},
					},
				},
				...theme.applyStyles('dark', {
					backgroundColor: theme.palette.grey[800],
				}),
			},
		}));
	}

	static StyledDataGrid = GridDataStyleManager.getStyledDataGrid();
}
