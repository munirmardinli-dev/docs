import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default class ExpenseStyleManager {
	static getStyledContainer() {
		return styled(Paper)(({ theme }) => ({
			padding: theme.spacing(3),
			margin: theme.spacing(2, 0),
			borderRadius: theme.spacing(1),
			backgroundColor: 'rgb(var(--nextra-bg))',
			border: '1px solid rgb(var(--nextra-bg))',
		}));
	}

	static getStyledHeader() {
		return styled(Typography)(({ theme }) => ({
			fontSize: '1.5rem',
			fontWeight: 600,
			color: '#FFFFFF',
			marginBottom: theme.spacing(3),
			textAlign: 'center',
		}));
	}

	static getStyledGrid() {
		return styled(Grid)(({ theme }) => ({
			marginBottom: theme.spacing(3),
		}));
	}

	static getStyledCard() {
		return styled(Paper)(({ theme }) => ({
			padding: theme.spacing(2),
			margin: theme.spacing(1),
			backgroundColor: 'rgba(255, 255, 255, 0.02)',
			border: '1px solid rgba(255, 255, 255, 0.1)',
			borderRadius: theme.spacing(0.5),
			transition: 'all 0.3s ease',
			'&:hover': {
				backgroundColor: 'rgba(255, 255, 255, 0.05)',
				transform: 'translateY(-2px)',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
			},
		}));
	}

	static getStyledDate() {
		return styled(Typography)(() => ({
			fontSize: '0.9rem',
			color: 'rgba(255, 255, 255, 0.7)',
			marginBottom: 8,
		}));
	}

	static getStyledTotal() {
		return styled(Typography)(() => ({
			fontSize: '1.2rem',
			fontWeight: 600,
			color: '#4CAF50',
			marginBottom: 8,
		}));
	}

	static getStyledStore() {
		return styled(Typography)(() => ({
			fontSize: '0.8rem',
			color: 'rgba(255, 255, 255, 0.5)',
			marginBottom: 8,
		}));
	}

	static getStyledItems() {
		return styled(Box)(() => ({
			marginTop: 8,
		}));
	}

	static getStyledItem() {
		return styled(Typography)(() => ({
			fontSize: '0.8rem',
			color: 'rgba(255, 255, 255, 0.6)',
			marginBottom: 4,
			lineHeight: 1.3,
		}));
	}

	static getStyledError() {
		return styled(Typography)(() => ({
			color: '#F44336',
			textAlign: 'center',
			margin: '16px 0',
		}));
	}

	static getStyledLoading() {
		return styled(Typography)(() => ({
			color: 'rgba(255, 255, 255, 0.7)',
			textAlign: 'center',
			margin: '16px 0',
		}));
	}

	static getStyledEmpty() {
		return styled(Typography)(() => ({
			color: 'rgba(255, 255, 255, 0.6)',
			textAlign: 'center',
			margin: '32px 0',
			fontStyle: 'italic',
		}));
	}

	static StyledContainer = ExpenseStyleManager.getStyledContainer();
	static StyledHeader = ExpenseStyleManager.getStyledHeader();
	static StyledGrid = ExpenseStyleManager.getStyledGrid();
	static StyledCard = ExpenseStyleManager.getStyledCard();
	static StyledDate = ExpenseStyleManager.getStyledDate();
	static StyledTotal = ExpenseStyleManager.getStyledTotal();
	static StyledStore = ExpenseStyleManager.getStyledStore();
	static StyledItems = ExpenseStyleManager.getStyledItems();
	static StyledItem = ExpenseStyleManager.getStyledItem();
	static StyledError = ExpenseStyleManager.getStyledError();
	static StyledLoading = ExpenseStyleManager.getStyledLoading();
	static StyledEmpty = ExpenseStyleManager.getStyledEmpty();
}
