import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { ApplicationJobStatusEnum, ApplicationJobStatusEnumType } from '@/constants/applicationJobStatus';

export default class ApplicationJobStyleManager {
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

	static getStyledDescription() {
		return styled(Typography)(() => ({
			fontSize: '0.9rem',
			color: 'rgba(255, 255, 255, 0.7)',
			marginBottom: 8,
		}));
	}

	static getStyledDate() {
		return styled(Typography)(() => ({
			fontSize: '0.8rem',
			color: 'rgba(255, 255, 255, 0.6)',
		}));
	}

	static getStyledCard() {
		return styled(Box, {
			shouldForwardProp: (prop) => prop !== 'isCompleted' && prop !== 'status',
		})<{ isCompleted?: boolean; status?: ApplicationJobStatusEnumType }>(({ isCompleted, status }) => {
			const colors = {
				[ApplicationJobStatusEnum.pending]: '#FF9800',
				[ApplicationJobStatusEnum.responded]: '#2196F3',
				[ApplicationJobStatusEnum.rejected]: '#F44336',
				[ApplicationJobStatusEnum.accepted]: '#4CAF50',
			};
			const statusColor = colors[status || ApplicationJobStatusEnum.pending];

			return {
				background: isCompleted
					? 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
					: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
				border: isCompleted
					? '1px solid rgba(76, 175, 80, 0.25)'
					: '1px solid rgba(255, 255, 255, 0.1)',
				borderRadius: 4,
				padding: 28,
				cursor: 'pointer',
				transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
				opacity: isCompleted ? 0.85 : 1,
				boxShadow: '0 6px 20px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.08)',
				position: 'relative',
				overflow: 'hidden',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: '2px',
					background: isCompleted
						? 'linear-gradient(90deg, #4CAF50, #66BB6A)'
						: `linear-gradient(90deg, ${statusColor}, ${statusColor}CC)`,
					opacity: 0,
					transition: 'opacity 0.3s ease',
				},
				'&:hover': {
					background: isCompleted
						? 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(76, 175, 80, 0.08) 100%)'
						: `linear-gradient(135deg, ${statusColor}20, ${statusColor}10)`,
					transform: 'translateY(-6px) scale(1.02)',
					boxShadow: `0 12px 32px ${statusColor}30, 0 4px 12px rgba(0, 0, 0, 0.15)`,
					borderColor: isCompleted
						? 'rgba(76, 175, 80, 0.5)'
						: `${statusColor}40`,
					'&::before': {
						opacity: 1,
					},
				},
			};
		});
	}

	static getStyledCardTitle() {
		return styled(Typography, {
			shouldForwardProp: (prop) => prop !== 'isCompleted',
		})<{ isCompleted?: boolean }>(({ isCompleted }) => ({
			color: '#FFFFFF',
			fontWeight: 700,
			marginBottom: 20,
			textDecoration: isCompleted ? 'line-through' : 'none',
			fontSize: '1.15rem',
			lineHeight: 1.3,
			letterSpacing: '-0.01em',
			background: isCompleted
				? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)'
				: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.95) 100%)',
			backgroundClip: 'text',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent',
		}));
	}

	static getStyledCardStatus() {
		return styled(Box)(() => ({
			display: 'flex',
			alignItems: 'center',
			marginBottom: 20,
		}));
	}

	static getStyledCardStatusChip() {
		return styled(Chip)<{
			status?: ApplicationJobStatusEnumType;
		}>(({ status }) => ({
			background: status === ApplicationJobStatusEnum.pending
				? 'linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)'
				: status === ApplicationJobStatusEnum.responded
					? 'linear-gradient(135deg, #2196F3 0%, #42A5F5 100%)'
					: status === ApplicationJobStatusEnum.rejected
						? 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)'
						: 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
			color: '#FFFFFF',
			fontSize: '0.8rem',
			height: 28,
			fontWeight: 700,
			boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)',
			borderRadius: 14,
			textTransform: 'uppercase',
			letterSpacing: '0.5px',
			'& .MuiChip-label': {
				padding: '0 16px',
			},
			'&:hover': {
				transform: 'scale(1.05)',
				boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3), 0 3px 6px rgba(0, 0, 0, 0.2)',
			},
		}));
	}

	static getStyledCardDate() {
		return styled(Box, {
			shouldForwardProp: (prop) => prop !== 'isCompleted',
		})<{ isCompleted?: boolean }>(({ isCompleted }) => ({
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			marginTop: 'auto',
		}));
	}

	static getStyledCardDateIndicator() {
		return styled(Box, {
			shouldForwardProp: (prop) => prop !== 'status',
		})<{ status?: ApplicationJobStatusEnumType }>(({ status }) => {
			const colors = {
				[ApplicationJobStatusEnum.pending]: '#FF9800',
				[ApplicationJobStatusEnum.responded]: '#2196F3',
				[ApplicationJobStatusEnum.rejected]: '#F44336',
				[ApplicationJobStatusEnum.accepted]: '#4CAF50',
			};
			const color = colors[status || ApplicationJobStatusEnum.pending];

			return {
				width: 4,
				height: 4,
				borderRadius: '50%',
				backgroundColor: color,
				boxShadow: `0 0 8px ${color}60`,
			};
		});
	}

	static getStyledCardDateText() {
		return styled(Typography)(() => ({
			color: 'rgba(255, 255, 255, 0.8)',
			fontSize: '0.9rem',
			fontWeight: 600,
			letterSpacing: '0.03em',
		}));
	}

	static StyledContainer = ApplicationJobStyleManager.getStyledContainer();
	static StyledHeader = ApplicationJobStyleManager.getStyledHeader();
	static StyledDescription = ApplicationJobStyleManager.getStyledDescription();
	static StyledDate = ApplicationJobStyleManager.getStyledDate();
	static StyledCard = ApplicationJobStyleManager.getStyledCard();
	static StyledCardTitle = ApplicationJobStyleManager.getStyledCardTitle();
	static StyledCardStatus = ApplicationJobStyleManager.getStyledCardStatus();
	static StyledCardStatusChip = ApplicationJobStyleManager.getStyledCardStatusChip();
	static StyledCardDate = ApplicationJobStyleManager.getStyledCardDate();
	static StyledCardDateIndicator = ApplicationJobStyleManager.getStyledCardDateIndicator();
	static StyledCardDateText = ApplicationJobStyleManager.getStyledCardDateText();

}
