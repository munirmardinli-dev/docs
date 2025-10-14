import { type Metadata } from 'next/types';
import packageJson from 'package.json';

export const metadata: Metadata = {
	metadataBase: new URL(packageJson.preview.uiUrl),
	title: '%s',
	description: '%s',
};
