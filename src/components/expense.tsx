'use client';
import React, { Component } from 'react';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Close from '@mui/icons-material/Close';

import { get } from '@/utils/get';
import DayjsManager from '@/utils/dayjs';
import ExpenseStyleManager from '@/styles/expense';

export default class Expense extends Component<ComponentProps, ExpenseState> {
	private dayjs;

	constructor(props: ComponentProps) {
		super(props);
		this.state = {
			expenses: [],
			loading: true,
			error: null,
			currentPage: 0,
			pageSize: 8,
			selectedExpense: null,
			modalOpen: false,
		};

		DayjsManager.initialize();
		this.dayjs = DayjsManager.getDayjs();
	}

	async componentDidMount() {
		await this.loadExpenses();
	}

	private loadExpenses = async (): Promise<void> => {
		try {
			this.setState({ loading: true, error: null });
			const filename = this.props.filename ?? 'expense.json';
			const data = await get<ExpenseJsonData>(filename);
			this.setState({
				expenses: data.expenses,
				loading: false,
			});
		} catch (error) {
			this.setState({
				error: `Fehler beim Laden der Expenses: ${error}`,
				loading: false,
			});
		}
	};

	private handlePageChange = (
		event: React.ChangeEvent<unknown>,
		page: number
	): void => {
		this.setState({ currentPage: page - 1 });
	};

	private handleOpenModal = (expense: ExpenseData): void => {
		this.setState({ selectedExpense: expense, modalOpen: true });
	};

	private handleCloseModal = (): void => {
		this.setState({ selectedExpense: null, modalOpen: false });
	};

	private paginateExpenses = (expenses: ExpenseData[]): ExpenseData[] => {
		if (!expenses || !Array.isArray(expenses)) {
			return [];
		}
		const { currentPage, pageSize } = this.state;
		const startIndex = currentPage * pageSize;
		const endIndex = startIndex + pageSize;
		return expenses.slice(startIndex, endIndex);
	};

	private formatDateTime = (dateTimeString: string): string => {
		if (!dateTimeString || dateTimeString.trim() === '') {
			return '';
		}
		const dateTime = this.dayjs(dateTimeString);
		return dateTime.isValid()
			? dateTime.tz(process.env.TZ).format('DD.MM.YYYY HH:mm')
			: '';
	};

	private formatDate = (dateTimeString: string): string => {
		if (!dateTimeString || dateTimeString.trim() === '') {
			return '';
		}
		const dateTime = this.dayjs(dateTimeString);
		return dateTime.isValid()
			? dateTime.tz(process.env.TZ).format('DD.MM.YYYY')
			: '';
	};

	private formatTime = (dateTimeString: string): string => {
		if (!dateTimeString || dateTimeString.trim() === '') {
			return '';
		}
		const dateTime = this.dayjs(dateTimeString);
		return dateTime.isValid()
			? dateTime.tz(process.env.TZ).format('HH:mm')
			: '';
	};

	private formatCurrency = (amount: number): string => {
		return `${amount.toFixed(2)} €`;
	};

	private calculateSum = (expense: ExpenseData): number => {
		if (!expense.items || !Array.isArray(expense.items)) {
			return 0;
		}
		return expense.items.reduce((sum, item) => sum + (item.value || 0), 0);
	};

	private sortExpenses = (expenses: ExpenseData[]): ExpenseData[] => {
		if (!expenses || !Array.isArray(expenses)) {
			return [];
		}
		return expenses.sort((a, b) => {
			// Parse ISO datetime strings with dayjs
			const aDateTime = this.dayjs(a.date);
			const bDateTime = this.dayjs(b.date);

			// Check if dates are valid before comparing
			if (!aDateTime.isValid() || !bDateTime.isValid()) {
				return 0;
			}

			return bDateTime.valueOf() - aDateTime.valueOf();
		});
	};

	render() {
		const {
			expenses,
			loading,
			error,
			currentPage,
			pageSize,
			selectedExpense,
			modalOpen,
		} = this.state;

		if (loading) {
			return (
				<ExpenseStyleManager.StyledContainer>
					<ExpenseStyleManager.StyledHeader>
						Kassenbons werden geladen...
					</ExpenseStyleManager.StyledHeader>
				</ExpenseStyleManager.StyledContainer>
			);
		}

		if (error) {
			return (
				<ExpenseStyleManager.StyledContainer>
					<ExpenseStyleManager.StyledHeader>
						Fehler
					</ExpenseStyleManager.StyledHeader>
					<ExpenseStyleManager.StyledError>
						{error}
					</ExpenseStyleManager.StyledError>
				</ExpenseStyleManager.StyledContainer>
			);
		}

		const sortedExpenses = this.sortExpenses(expenses);
		const paginatedExpenses = this.paginateExpenses(sortedExpenses);
		const totalPages = Math.ceil(sortedExpenses.length / pageSize);

		return (
			<ExpenseStyleManager.StyledContainer>
				<ExpenseStyleManager.StyledHeader>
					Meine Kassenbons
				</ExpenseStyleManager.StyledHeader>

				{paginatedExpenses.length === 0 ? (
					<ExpenseStyleManager.StyledEmpty>
						Keine Kassenbons gefunden.
					</ExpenseStyleManager.StyledEmpty>
				) : (
					<>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: {
									xs: '1fr',
									sm: 'repeat(2, 1fr)',
									md: 'repeat(4, 1fr)',
								},
								gap: 2,
								marginBottom: 3,
							}}
						>
							{paginatedExpenses.map((expense, index) => (
								<ExpenseStyleManager.StyledCard
									key={index}
									onClick={() => this.handleOpenModal(expense)}
									sx={{ cursor: 'pointer' }}
								>
									<ExpenseStyleManager.StyledDate>
										{this.formatDateTime(expense.date)}
									</ExpenseStyleManager.StyledDate>
									<ExpenseStyleManager.StyledTotal>
										{this.formatCurrency(this.calculateSum(expense))}
									</ExpenseStyleManager.StyledTotal>
									{expense.store && (
										<ExpenseStyleManager.StyledStore>
											{expense.store}
										</ExpenseStyleManager.StyledStore>
									)}
								</ExpenseStyleManager.StyledCard>
							))}
						</Box>

						{totalPages > 1 && (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									mt: 3,
									'& .MuiPaginationItem-root': {
										color: '#FFFFFF',
										'&.Mui-selected': {
											backgroundColor: 'rgba(33, 150, 243, 0.3)',
											color: '#FFFFFF',
										},
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
										},
									},
								}}
							>
								<Pagination
									count={totalPages}
									page={currentPage + 1}
									onChange={this.handlePageChange}
									color="primary"
									size="large"
								/>
							</Box>
						)}
					</>
				)}

				<Dialog
					open={modalOpen}
					onClose={this.handleCloseModal}
					maxWidth="md"
					fullWidth
					sx={{
						'& .MuiDialog-paper': {
							backgroundColor: 'rgb(var(--nextra-bg))',
							color: '#FFFFFF',
							border: '1px solid rgba(255, 255, 255, 0.1)',
							borderRadius: 3,
							boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
							backdropFilter: 'blur(10px)',
						},
						'& .MuiBackdrop-root': {
							backgroundColor: 'rgba(0, 0, 0, 0.7)',
							backdropFilter: 'blur(5px)',
						},
					}}
				>
					{selectedExpense && (
						<>
							<DialogTitle
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									backgroundColor: 'rgba(255, 255, 255, 0.05)',
									borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
									px: 3,
									py: 2,
								}}
							>
								<Typography
									variant="h5"
									sx={{
										color: '#FFFFFF',
										fontWeight: 700,
										fontSize: '1.5rem',
									}}
								>
									Kassenbon Details
								</Typography>
								<IconButton
									onClick={this.handleCloseModal}
									sx={{
										color: '#FFFFFF',
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.2)',
										},
									}}
								>
									<Close />
								</IconButton>
							</DialogTitle>

							<DialogContent sx={{ px: 3, py: 3 }}>
								{/* Kassenbon Info */}
								<Box sx={{ mb: 4 }}>
									<Typography
										variant="h6"
										sx={{
											color: '#FFFFFF',
											mb: 2,
											fontWeight: 600,
											fontSize: '1.1rem',
											borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
											pb: 1,
										}}
									>
										Kassenbon Information
									</Typography>
									<Box
										sx={{
											backgroundColor: 'rgba(255, 255, 255, 0.03)',
											border: '1px solid rgba(255, 255, 255, 0.1)',
											borderRadius: 2,
											padding: 2,
											borderLeft: '4px solid #4CAF50',
										}}
									>
										<Typography
											variant="body1"
											sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 1 }}
										>
											<strong>Datum:</strong>{' '}
											{this.formatDate(selectedExpense.date)}
										</Typography>
										<Typography
											variant="body1"
											sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 1 }}
										>
											<strong>Uhrzeit:</strong>{' '}
											{this.formatTime(selectedExpense.date)}
										</Typography>
										<Typography
											variant="body1"
											sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 1 }}
										>
											<strong>Store:</strong>{' '}
											{selectedExpense.store || 'Nicht angegeben'}
										</Typography>
										<Typography
											variant="body1"
											sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 1 }}
										>
											<strong>Gesamtbetrag:</strong>{' '}
											{this.formatCurrency(this.calculateSum(selectedExpense))}
										</Typography>
									</Box>
								</Box>

								{/* Artikel Liste */}
								<Box sx={{ mb: 4 }}>
									<Typography
										variant="h6"
										sx={{
											color: '#FFFFFF',
											mb: 2,
											fontWeight: 600,
											fontSize: '1.1rem',
											borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
											pb: 1,
										}}
									>
										Artikel ({selectedExpense.items.length})
									</Typography>
									<Box
										sx={{
											backgroundColor: 'rgba(255, 255, 255, 0.03)',
											border: '1px solid rgba(255, 255, 255, 0.1)',
											borderRadius: 2,
											padding: 2,
											borderLeft: '4px solid #2196F3',
										}}
									>
										{selectedExpense.items.map((item, index) => (
											<Box
												key={index}
												sx={{
													display: 'flex',
													justifyContent: 'space-between',
													alignItems: 'center',
													py: 1,
													borderBottom:
														index < selectedExpense.items.length - 1
															? '1px solid rgba(255, 255, 255, 0.1)'
															: 'none',
												}}
											>
												<Typography
													variant="body1"
													sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
												>
													{item.key}
												</Typography>
												<Typography
													variant="body1"
													sx={{ color: '#4CAF50', fontWeight: 600 }}
												>
													{this.formatCurrency(item.value)}
												</Typography>
											</Box>
										))}
									</Box>
								</Box>
							</DialogContent>

							<DialogActions sx={{ px: 3, py: 2 }}>
								<Button
									onClick={this.handleCloseModal}
									sx={{
										color: '#FFFFFF',
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
										border: '1px solid rgba(255, 255, 255, 0.2)',
										'&:hover': {
											backgroundColor: 'rgba(255, 255, 255, 0.2)',
										},
									}}
								>
									Schließen
								</Button>
							</DialogActions>
						</>
					)}
				</Dialog>
			</ExpenseStyleManager.StyledContainer>
		);
	}
}
