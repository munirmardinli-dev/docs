import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import packageJson from 'package.json';
import DayjsManager from '@/utils/dayjs';

export default function Copyright() {
	DayjsManager.initialize();
	const dayjs = DayjsManager.getDayjs();
	return (
		<Typography
			variant="body2"
			align="center"
			sx={{
				color: 'text.secondary',
			}}
		>
			{'Copyright © '}
			<MuiLink color="inherit" href={process.env.NEXT_PUBLIC_UI_URL}>
				{packageJson.sponsor.name}
			</MuiLink>{' '}
			{dayjs().year()}.
		</Typography>
	);
}
