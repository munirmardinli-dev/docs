import { BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export const StyledQuoteContainer = styled(Paper)(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(3, 4),
	margin: theme.spacing(2, 0),
	borderRadius: theme.spacing(1),
	borderLeft: `4px solid #2196F3`,
	backgroundColor: 'transparent',
	boxShadow: 'none',
	'&:hover': {
		boxShadow: 'none',
		transition: 'none',
	},
}));

export const StyledQuoteIconStart = styled(FormatQuoteIcon)(({ theme }) => ({
	position: 'absolute',
	top: theme.spacing(1),
	left: theme.spacing(1),
	color: '#2196F3',
	opacity: 0.3,
	fontSize: '2rem',
}));

export const StyledQuoteIconEnd = styled(FormatQuoteIcon)(({ theme }) => ({
	display: 'inline-block',
	color: '#2196F3',
	opacity: 0.3,
	fontSize: '2rem',
	transform: 'rotate(180deg)',
	marginLeft: theme.spacing(0.5),
	verticalAlign: 'top',
}));

export const StyledQuoteText = styled(Typography)(({ theme }) => ({
	fontStyle: 'italic',
	fontSize: '1.1rem',
	lineHeight: 1.6,
	color: '#FFFFFF',
	marginBottom: theme.spacing(1),
	paddingLeft: theme.spacing(3),
}));

export const StyledQuoteAuthor = styled(Typography)(({ theme }) => ({
	fontSize: '0.9rem',
	fontWeight: 600,
	color: '#FFFFFF',
	textAlign: 'right',
	marginTop: theme.spacing(1),
	display: 'inline-block',
}));

export const StyledQuoteSource = styled(Typography)(({ theme }) => ({
	fontSize: '0.8rem',
	color: '#FFFFFF',
	textAlign: 'right',
	fontStyle: 'italic',
	display: 'inline-block',
	marginLeft: theme.spacing(1),
	'&::before': {
		content: '"("',
	},
	'&::after': {
		content: '")"',
	},
}));

export const StyledQuoteSourceLink = styled(Link)(({ theme }) => ({
	fontSize: '0.8rem',
	color: '#2196F3',
	textAlign: 'right',
	fontStyle: 'italic',
	display: 'inline-block',
	marginLeft: theme.spacing(1),
	textDecoration: 'none',
	'&:hover': {
		textDecoration: 'underline',
		color: '#64B5F6',
	},
	'&::before': {
		content: '"("',
	},
	'&::after': {
		content: '")"',
	},
}));

export const HighlightedQuoteContainer = styled(Paper)(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(4, 5),
	margin: theme.spacing(3, 0),
	borderRadius: theme.spacing(2),
	background: 'transparent',
	border: `2px solid #2196F3`,
	boxShadow: 'none',
}));

export const MinimalQuoteContainer = styled(Box)<BoxProps>(({ theme }) => ({
	position: 'relative',
	padding: theme.spacing(2, 3),
	margin: theme.spacing(2, 0),
	borderLeft: `3px solid #2196F3`,
	backgroundColor: 'transparent',
}));
