import getEnv from '@/lib/env';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
	metadataBase: new URL(getEnv().NEXT_PUBLIC_UI_URL),
	title: '%s',
	description: '%s',
};
