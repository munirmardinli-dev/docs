import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import EnvManager from '@/lib/env';
import packageJson from 'package.json';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <MuiLink color="inherit" href={EnvManager.getEnv<string>().NEXT_PUBLIC_UI_URL}>
        {packageJson.sponsor.name}
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
