'use client';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ReactNode } from 'react';
import React from 'react';

export default class ClientLocalizationProvider extends React.Component<{children: ReactNode}> {
	constructor(props: {children: ReactNode}) {
		super(props);
	}

	render() {
		const { children } = this.props;

		return (
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{children}
			</LocalizationProvider>
		);
	}
}
