import EnvManager from '@/lib/env';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
	metadataBase: new URL(EnvManager.getEnv<string>().NEXT_PUBLIC_UI_URL),
	title: '%s',
	description: '%s',
};
