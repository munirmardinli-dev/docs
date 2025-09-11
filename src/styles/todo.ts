import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

export const TodoContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	margin: theme.spacing(2, 0),
	borderRadius: theme.spacing(1),
	backgroundColor: 'rgb(var(--nextra-bg))',
	border: '1px solid rgb(var(--nextra-bg))',
}));

export const TodoHeader = styled(Typography)(({ theme }) => ({
	fontSize: '1.5rem',
	fontWeight: 600,
	color: '#FFFFFF',
	marginBottom: theme.spacing(3),
	textAlign: 'center',
}));

export const TodoItem = styled(Paper)<{ completed?: boolean }>(
	({ theme, completed }) => ({
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(2),
		margin: theme.spacing(1, 0),
		backgroundColor: completed
			? 'rgba(76, 175, 80, 0.1)'
			: 'rgba(255, 255, 255, 0.02)',
		border: completed
			? '1px solid rgba(76, 175, 80, 0.3)'
			: '1px solid rgba(255, 255, 255, 0.1)',
		borderRadius: theme.spacing(0.5),
		opacity: completed ? 0.7 : 1,
		transition: 'all 0.3s ease',
		'&:hover': {
			backgroundColor: completed
				? 'rgba(76, 175, 80, 0.15)'
				: 'rgba(255, 255, 255, 0.05)',
		},
	})
);

export const TodoContent = styled(Box)(() => ({
	flex: 1,
	marginLeft: 16,
}));

export const TodoTitle = styled(Typography)<{ completed?: boolean }>(
	({ completed }) => ({
		fontSize: '1.1rem',
		fontWeight: 500,
		color: '#FFFFFF',
		textDecoration: completed ? 'line-through' : 'none',
		marginBottom: 4,
	})
);

export const TodoDescription = styled(Typography)<{ completed?: boolean }>(
	({ completed }) => ({
		fontSize: '0.9rem',
		color: completed ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.7)',
		marginBottom: 8,
	})
);

export const TodoMeta = styled(Box)(() => ({
	display: 'flex',
	gap: 8,
	alignItems: 'center',
	flexWrap: 'wrap',
}));

export const TodoDate = styled(Typography)(() => ({
	fontSize: '0.8rem',
	color: 'rgba(255, 255, 255, 0.6)',
}));

export const PriorityChip = styled(Chip)<{
	priority?: 'low' | 'medium' | 'high';
}>(({ priority }) => {
	const colors = {
		low: '#4CAF50',
		medium: '#FF9800',
		high: '#F44336',
	};

	return {
		fontSize: '0.7rem',
		height: 20,
		backgroundColor: colors[priority || 'low'],
		color: '#FFFFFF',
		'& .MuiChip-label': {
			padding: '0 6px',
		},
	};
});

export const StyledCheckbox = styled(Checkbox)(() => ({
	color: 'rgba(255, 255, 255, 0.6)',
	'&.Mui-checked': {
		color: '#4CAF50',
	},
}));

export const FilterContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	gap: theme.spacing(2),
	marginBottom: theme.spacing(3),
	flexWrap: 'wrap',
	alignItems: 'center',
}));

export const FilterLabel = styled(Typography)(() => ({
	fontSize: '0.9rem',
	color: 'rgba(255, 255, 255, 0.8)',
	minWidth: 60,
}));
