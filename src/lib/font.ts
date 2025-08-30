import { Fragment_Mono } from 'next/font/google';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';

export const FontCompany: NextFontWithVariable = Fragment_Mono({
	weight: ['400'],
	subsets: ['latin'],
	preload: true,
	display: 'swap',
	variable: '--font-fragment-mono',
	style: ['normal', 'italic'],
	adjustFontFallback: true,
});
