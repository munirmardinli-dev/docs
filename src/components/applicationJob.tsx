'use client';
import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Close from '@mui/icons-material/Close';

import { get } from '@/utils/get';
import DayjsManager from '@/utils/dayjs';
import {
	ApplicationJobStatusEnum,
	ApplicationJobStatusEnumType,
} from '@/constants/applicationJobStatus';
import ApplicationJobStyleManager from '@/styles/applicationJob';

export default class ApplicationsJob extends Component<
	ApplicationsJobProps,
	ApplicationJobState
> {
	private dayjs;

	constructor(props: ApplicationsJobProps) {
		super(props);
		this.state = {
			applicationJobs: [],
			loading: true,
			error: null,
			statusFilter: props.statusFilter || 'all',
			currentPage: 0,
			pageSize: 4,
			selectedJob: null,
			modalOpen: false,
			texts: null,
		};

		DayjsManager.initialize();
		this.dayjs = DayjsManager.getDayjs();
	}

	async componentDidMount() {
		await this.loadApplicationJobs();
	}

	private loadApplicationJobs = async (): Promise<void> => {
		try {
			this.setState({ loading: true, error: null });
			const filename = this.props.filename || 'application.json';
			const data = await get<ApplicationJobData>(filename);
			this.setState({
				applicationJobs: data.application,
				texts: data.texts,
				loading: false,
			});
		} catch (error) {
			this.setState({
				error: `Fehler beim Laden der Bewerbungen: ${error}`,
				loading: false,
			});
		}
	};

	private handleStatusFilterChange = (
		event: SelectChangeEvent<string>
	): void => {
		this.setState({
			statusFilter: event.target.value as 'all' | ApplicationJobStatusEnumType,
			currentPage: 0,
		});
	};

	private handlePageChange = (
		event: React.ChangeEvent<unknown>,
		page: number
	): void => {
		this.setState({ currentPage: page - 1 });
	};

	private filterApplicationJobs = (
		jobs: ApplicationJob[]
	): ApplicationJob[] => {
		if (this.state.statusFilter === 'all') return jobs;

		return jobs.filter((job) => {
			return job.status === this.state.statusFilter;
		});
	};

	private sortApplicationJobs = (jobs: ApplicationJob[]): ApplicationJob[] => {
		return jobs.sort((a, b) => {
			const aDate = this.dayjs(a.requestDate).tz(process.env.TZ).valueOf();
			const bDate = this.dayjs(b.requestDate).tz(process.env.TZ).valueOf();
			return bDate - aDate;
		});
	};

	private paginateApplicationJobs = (
		jobs: ApplicationJob[]
	): ApplicationJob[] => {
		const { currentPage, pageSize } = this.state;
		const startIndex = currentPage * pageSize;
		const endIndex = startIndex + pageSize;
		return jobs.slice(startIndex, endIndex);
	};

	private formatDate = (dateString: string): string => {
		return this.dayjs(dateString).tz(process.env.TZ).format('DD.MM.YYYY');
	};

	private handleCardClick = (job: ApplicationJob): void => {
		this.setState({
			selectedJob: job,
			modalOpen: true,
		});
	};

	private handleCloseModal = (): void => {
		this.setState({
			modalOpen: false,
			selectedJob: null,
		});
	};

	render() {
		const {
			applicationJobs,
			loading,
			error,
			statusFilter,
			currentPage,
			pageSize,
			selectedJob,
			modalOpen,
			texts,
		} = this.state;

		if (loading) {
			return (
				<ApplicationJobStyleManager.StyledContainer>
					<ApplicationJobStyleManager.StyledHeader>
						{texts?.loadingApplications ?? ''}
					</ApplicationJobStyleManager.StyledHeader>
				</ApplicationJobStyleManager.StyledContainer>
			);
		}

		if (error) {
			return (
				<ApplicationJobStyleManager.StyledContainer>
					<ApplicationJobStyleManager.StyledHeader>
						{texts?.error ?? ''}
					</ApplicationJobStyleManager.StyledHeader>
					<ApplicationJobStyleManager.StyledDescription>
						{error}
					</ApplicationJobStyleManager.StyledDescription>
				</ApplicationJobStyleManager.StyledContainer>
			);
		}

		const filteredJobs = this.filterApplicationJobs(applicationJobs);
		const sortedJobs = this.sortApplicationJobs(filteredJobs);
		const paginatedJobs = this.paginateApplicationJobs(sortedJobs);
		const totalPages = Math.ceil(sortedJobs.length / pageSize);

		return (
			<ApplicationJobStyleManager.StyledContainer>
				<ApplicationJobStyleManager.StyledHeader>
					{texts?.title ?? ''}
				</ApplicationJobStyleManager.StyledHeader>

				<Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
					<FormControl size="small" sx={{ minWidth: 120 }}>
						<Select
							value={statusFilter}
							onChange={this.handleStatusFilterChange}
							sx={{
								color: '#FFFFFF',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'rgba(255, 255, 255, 0.3)',
								},
								'& .MuiSvgIcon-root': {
									color: '#FFFFFF',
								},
							}}
						>
							<MenuItem value="all">{texts?.allApplications ?? ''}</MenuItem>
							<MenuItem value={ApplicationJobStatusEnum.pending}>
								{texts?.pending ?? ''}
							</MenuItem>
							<MenuItem value={ApplicationJobStatusEnum.responded}>
								{texts?.responded ?? ''}
							</MenuItem>
							<MenuItem value={ApplicationJobStatusEnum.rejected}>
								{texts?.rejected ?? ''}
							</MenuItem>
							<MenuItem value={ApplicationJobStatusEnum.accepted}>
								{texts?.accepted ?? ''}
							</MenuItem>
						</Select>
					</FormControl>
					<ApplicationJobStyleManager.StyledDate>
						{sortedJobs.length} {texts?.applicationsFound ?? ''}
					</ApplicationJobStyleManager.StyledDate>
				</Box>

				{paginatedJobs.length === 0 ? (
					<ApplicationJobStyleManager.StyledDescription>
						{texts?.noApplications ?? ''}
					</ApplicationJobStyleManager.StyledDescription>
				) : (
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
							gap: 2,
							mt: 2,
						}}
					>
						{paginatedJobs.map((job: ApplicationJob) => {
							const status = job.status as ApplicationJobStatusEnumType;
							const isCompleted =
								status === ApplicationJobStatusEnum.accepted ||
								status === ApplicationJobStatusEnum.rejected;

							return (
								<ApplicationJobStyleManager.StyledCard
									key={job.id}
									onClick={() => this.handleCardClick(job)}
									isCompleted={isCompleted}
									status={status}
								>
									<ApplicationJobStyleManager.StyledCardTitle
										isCompleted={isCompleted}
									>
										{job.title}
									</ApplicationJobStyleManager.StyledCardTitle>

									<ApplicationJobStyleManager.StyledCardStatus>
										<ApplicationJobStyleManager.StyledCardStatusChip
											label={status}
											status={status}
										/>
									</ApplicationJobStyleManager.StyledCardStatus>

									<ApplicationJobStyleManager.StyledCardDate
										isCompleted={isCompleted}
									>
										<ApplicationJobStyleManager.StyledCardDateIndicator
											status={status}
										/>
										<ApplicationJobStyleManager.StyledCardDateText>
											{texts?.applied ?? ''}: {this.formatDate(job.requestDate)}
										</ApplicationJobStyleManager.StyledCardDateText>
									</ApplicationJobStyleManager.StyledCardDate>
								</ApplicationJobStyleManager.StyledCard>
							);
						})}
					</Box>
				)}

				{totalPages > 1 && (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							mt: 4,
							mb: 2,
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
					{selectedJob && (
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
									{selectedJob.title}
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
								{/* Beschreibung */}
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
										{texts?.description ?? ''}
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
										<Typography
											variant="body1"
											sx={{
												color: 'rgba(255, 255, 255, 0.9)',
												lineHeight: 1.6,
											}}
										>
											{selectedJob.description || texts?.noDescription || ''}
										</Typography>
									</Box>
								</Box>

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
										{texts?.status ?? ''}
									</Typography>
									<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
										<Chip
											label={selectedJob.status}
											sx={{
												backgroundColor:
													selectedJob.status ===
													ApplicationJobStatusEnum.pending
														? '#FF9800'
														: selectedJob.status ===
														  ApplicationJobStatusEnum.responded
														? '#2196F3'
														: selectedJob.status ===
														  ApplicationJobStatusEnum.rejected
														? '#F44336'
														: '#4CAF50',
												color: '#FFFFFF',
												fontWeight: 600,
												fontSize: '0.9rem',
												height: 32,
												'& .MuiChip-label': {
													px: 2,
												},
											}}
										/>
									</Box>
								</Box>

								{selectedJob.label && (
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
											Kategorie
										</Typography>
										<Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
											<Chip
												label={selectedJob.label}
												sx={{
													backgroundColor: '#FF9800',
													color: '#FFFFFF',
													fontWeight: 600,
													fontSize: '0.9rem',
													height: 32,
													'& .MuiChip-label': {
														px: 2,
													},
												}}
											/>
										</Box>
									</Box>
								)}

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
										{texts?.timestamp ?? ''}
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
											sx={{
												color: 'rgba(255, 255, 255, 0.9)',
												mb: selectedJob.responseDate ? 1 : 0,
											}}
										>
											<strong>{texts?.applied ?? ''}:</strong>{' '}
											{this.formatDate(selectedJob.requestDate)}
										</Typography>
										{selectedJob.responseDate && (
											<Typography
												variant="body1"
												sx={{ color: 'rgba(255, 255, 255, 0.9)' }}
											>
												<strong>{texts?.responseReceived ?? ''}:</strong>{' '}
												{this.formatDate(selectedJob.responseDate)}
											</Typography>
										)}
									</Box>
								</Box>

								{selectedJob.link && (
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
											{texts?.jobPosting ?? ''}
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
											<Link
												href={selectedJob.link}
												target="_blank"
												rel="noopener noreferrer"
												sx={{
													color: '#2196F3',
													textDecoration: 'none',
													fontSize: '1rem',
													'&:hover': {
														textDecoration: 'underline',
														color: '#1976D2',
													},
												}}
											>
												{selectedJob.link}
											</Link>
										</Box>
									</Box>
								)}

								{selectedJob.responseText && (
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
											{texts?.employerResponse ?? ''}
										</Typography>
										<Box
											sx={{
												backgroundColor: 'rgba(255, 255, 255, 0.03)',
												border: '1px solid rgba(255, 255, 255, 0.1)',
												borderRadius: 2,
												padding: 3,
												borderLeft: '4px solid #4CAF50',
												position: 'relative',
												'&::before': {
													content: '"💬"',
													position: 'absolute',
													top: -10,
													right: 10,
													fontSize: '1.5rem',
												},
											}}
										>
											<Typography
												variant="body1"
												sx={{
													color: 'rgba(255, 255, 255, 0.95)',
													fontStyle: 'italic',
													lineHeight: 1.6,
													fontSize: '1rem',
												}}
											>
												{selectedJob.responseText}
											</Typography>
										</Box>
									</Box>
								)}
							</DialogContent>

							<DialogActions
								sx={{
									px: 3,
									py: 2,
									backgroundColor: 'rgba(255, 255, 255, 0.03)',
									borderTop: '1px solid rgba(255, 255, 255, 0.1)',
								}}
							>
								<Button
									onClick={this.handleCloseModal}
									variant="outlined"
									sx={{
										color: '#FFFFFF',
										borderColor: 'rgba(255, 255, 255, 0.3)',
										fontWeight: 600,
										px: 3,
										py: 1,
										borderRadius: 2,
										'&:hover': {
											borderColor: 'rgba(255, 255, 255, 0.5)',
											backgroundColor: 'rgba(255, 255, 255, 0.1)',
											transform: 'translateY(-1px)',
										},
									}}
								>
									{texts?.close ?? ''}
								</Button>
							</DialogActions>
						</>
					)}
				</Dialog>
			</ApplicationJobStyleManager.StyledContainer>
		);
	}
}
