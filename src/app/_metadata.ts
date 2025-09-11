import { type Metadata } from 'next/types';

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_UI_URL),
	title: '%s',
	description: '%s',
};
