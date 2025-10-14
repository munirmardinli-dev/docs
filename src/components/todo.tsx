'use client';
import React, { Component } from 'react';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

import { get } from '@/utils/get';
import DayjsManager from '@/utils/dayjs';
import {
	TodoContainer,
	TodoHeader,
	TodoItem,
	TodoContent,
	TodoTitle,
	TodoDescription,
	TodoMeta,
	TodoDate,
	PriorityChip,
	StyledCheckbox,
	FilterContainer,
	FilterLabel,
} from '@/styles/todo';

export default class Todo extends Component<ComponentProps, TodoState> {
	private dayjs;

	constructor(props: ComponentProps) {
		super(props);
		this.state = {
			todos: [],
			loading: true,
			error: null,
			dateFilter: 'all',
			currentPage: 0,
			pageSize: 4,
		};

		DayjsManager.initialize();
		this.dayjs = DayjsManager.getDayjs();
	}

	async componentDidMount() {
		await this.loadTodos();
	}

	private loadTodos = async (): Promise<void> => {
		try {
			this.setState({ loading: true, error: null });
			const filename = this.props.filename || 'todos.json';
			const data = await get<TodoData>(filename);
			this.setState({ todos: data.todos, loading: false });
		} catch (error) {
			this.setState({
				error: `Fehler beim Laden der Todos: ${error}`,
				loading: false,
			});
		}
	};

	private handleDateFilterChange = (event: SelectChangeEvent<string>): void => {
		this.setState({
			dateFilter: event.target.value as 'all' | 'today' | 'week' | 'overdue',
			currentPage: 0,
		});
	};

	private handlePageChange = (
		event: React.ChangeEvent<unknown>,
		page: number
	): void => {
		this.setState({ currentPage: page - 1 });
	};

	private filterTodos = (todos: TodoItem[]): TodoItem[] => {
		const now = this.dayjs().tz(process.env.TZ);
		const today = now.startOf('day');
		const weekFromNow = today.add(7, 'day');

		return todos.filter((todo) => {
			if (this.state.dateFilter === 'all') return true;

			if (!todo.dueDate) return false;

			const dueDate = this.dayjs(todo.dueDate).tz(process.env.TZ);
			const dueDateOnly = dueDate.startOf('day');

			switch (this.state.dateFilter) {
				case 'today':
					return dueDateOnly.isSame(today, 'day');
				case 'week':
					return dueDateOnly.isBetween(today, weekFromNow, 'day', '[]');
				case 'overdue':
					return dueDateOnly.isBefore(today, 'day') && !todo.done;
				default:
					return true;
			}
		});
	};

	private sortTodos = (todos: TodoItem[]): TodoItem[] => {
		return todos.sort((a, b) => {
			if (a.done !== b.done) {
				return a.done ? 1 : -1;
			}

			const aDate = a.dueDate
				? this.dayjs(a.dueDate).tz(process.env.TZ).valueOf()
				: this.dayjs(a.createdAt).tz(process.env.TZ).valueOf();
			const bDate = b.dueDate
				? this.dayjs(b.dueDate).tz(process.env.TZ).valueOf()
				: this.dayjs(b.createdAt).tz(process.env.TZ).valueOf();

			return aDate - bDate;
		});
	};

	private paginateTodos = (todos: TodoItem[]): TodoItem[] => {
		const { currentPage, pageSize } = this.state;
		const startIndex = currentPage * pageSize;
		const endIndex = startIndex + pageSize;
		return todos.slice(startIndex, endIndex);
	};

	private formatDate = (dateString: string): string => {
		return this.dayjs(dateString)
			.tz(process.env.TZ)
			.format('DD.MM.YYYY HH:mm');
	};

	private isOverdue = (todo: TodoItem): boolean => {
		if (!todo.dueDate || todo.done) return false;
		const now = this.dayjs().tz(process.env.TZ);
		const dueDate = this.dayjs(todo.dueDate).tz(process.env.TZ);
		return dueDate.isBefore(now);
	};

	render() {
		const { todos, loading, error, dateFilter, currentPage, pageSize } =
			this.state;

		if (loading) {
			return (
				<TodoContainer>
					<TodoHeader>Todos werden geladen...</TodoHeader>
				</TodoContainer>
			);
		}

		if (error) {
			return (
				<TodoContainer>
					<TodoHeader>Fehler</TodoHeader>
					<TodoDescription>{error}</TodoDescription>
				</TodoContainer>
			);
		}

		const filteredTodos = this.filterTodos(todos);
		const sortedTodos = this.sortTodos(filteredTodos);
		const paginatedTodos = this.paginateTodos(sortedTodos);
		const totalPages = Math.ceil(sortedTodos.length / pageSize);

		return (
			<TodoContainer>
				<TodoHeader>Meine Todos</TodoHeader>

				<FilterContainer>
					<FilterLabel>Filter:</FilterLabel>
					<FormControl size="small" sx={{ minWidth: 120 }}>
						<Select
							value={dateFilter}
							onChange={this.handleDateFilterChange}
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
							<MenuItem value="all">Alle</MenuItem>
							<MenuItem value="today">Heute</MenuItem>
							<MenuItem value="week">Diese Woche</MenuItem>
							<MenuItem value="overdue">Überfällig</MenuItem>
						</Select>
					</FormControl>
					<FilterLabel>
						{sortedTodos.length} Todo{sortedTodos.length !== 1 ? 's' : ''}{' '}
						gefunden
					</FilterLabel>
				</FilterContainer>

				{paginatedTodos.length === 0 ? (
					<TodoDescription>Keine Todos gefunden.</TodoDescription>
				) : (
					<>
						{paginatedTodos.map((todo) => (
							<TodoItem key={todo.id} completed={todo.done}>
								<StyledCheckbox checked={todo.done} disabled />
								<TodoContent>
									<TodoTitle completed={todo.done}>
										{todo.title}
										{this.isOverdue(todo) && ' ⚠️'}
									</TodoTitle>
									{todo.description && (
										<TodoDescription completed={todo.done}>
											{todo.description}
										</TodoDescription>
									)}
									<TodoMeta>
										{todo.priority && (
											<PriorityChip
												label={todo.priority}
												priority={todo.priority}
												size="small"
											/>
										)}
										<TodoDate>
											Erstellt: {this.formatDate(todo.createdAt)}
										</TodoDate>
										{todo.dueDate && (
											<TodoDate>
												Fällig: {this.formatDate(todo.dueDate)}
											</TodoDate>
										)}
									</TodoMeta>
								</TodoContent>
							</TodoItem>
						))}

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
			</TodoContainer>
		);
	}
}
