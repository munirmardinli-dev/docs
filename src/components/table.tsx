'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import PrintIcon from '@mui/icons-material/Print';
import {
	GridColDef,
	GridDensity,
	GridRowModel,
	ExportCsv,
	ExportPrint,
	ToolbarButton,
	Toolbar,
	GridValidRowModel,
} from '@mui/x-data-grid';
import { StyledDataGrid } from '@/styles/gridData';

const columns: GridColDef<GridRowModel>[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'from',
		headerName: 'von',
		width: 170,
		editable: false,
		type: 'dateTime',
		valueGetter: (value) => value && new Date(value),
		valueFormatter: (value) =>
			value && new Date(value).toLocaleDateString('de-DE'),
		disableReorder: true,
	},
	{
		field: 'to',
		headerName: 'bis',
		width: 170,
		editable: false,
		type: 'dateTime',
		valueGetter: (value) => value && new Date(value),
		valueFormatter: (value) =>
			value && new Date(value).toLocaleDateString('de-DE'),
		disableReorder: true,
	},
	{
		field: 'remark',
		headerName: 'Bemerkung',
		width: 335,
		editable: false,
		disableReorder: true,
	},
];

export default function Table({
	row
}: {
	row:  GridRowModel[];
}): React.JSX.Element {
	const [density, setDensity] = React.useState<GridDensity>('compact');
	const PAGE_SIZE: number = 8;
	return (
		<Box>
			<StyledDataGrid
				rows={row}
				columns={columns}
				getRowClassName={(params) =>
					params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
				}
				density={density}
				onDensityChange={(newDensity) => setDensity(newDensity)}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: PAGE_SIZE,
							page: 0,
						},
					},
				}}
				localeText={{
					toolbarQuickFilterPlaceholder: 'Suche',
				}}
				pageSizeOptions={[PAGE_SIZE]}
				getRowId={(row: GridValidRowModel) => row.id}
				columnBufferPx={100}
				disableRowSelectionOnClick
				disableColumnMenu
				disableColumnFilter
				disableColumnSorting
				disableColumnResize
				disableMultipleRowSelection
				disableColumnSelector
				columnVisibilityModel={{
					id: false,
				}}
				showToolbar
				slots={{ toolbar: CustomToolbar }}
			/>
		</Box>
	);
}

function CustomToolbar() {
	return (
		<Toolbar>
			<Tooltip title="Download as CSV">
				<ExportCsv render={<ToolbarButton />}>
					<FileDownloadIcon fontSize="small" />
				</ExportCsv>
			</Tooltip>
			<Tooltip title="Print">
				<ExportPrint render={<ToolbarButton />}>
					<PrintIcon fontSize="small" />
				</ExportPrint>
			</Tooltip>
		</Toolbar>
	);
}
