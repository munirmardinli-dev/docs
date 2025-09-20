'use client';
import { ReactElement } from 'react';
import { Cv } from '@/components/cv/cv';
import ApplicationLetterOverview from '@/components/cv/write';
import CoverSheetOverwie from '@/components/cv/coverSheet';
import { Document } from '@react-pdf/renderer';
import Certification from '@/components/cv/certification';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
	() => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
	{
		ssr: false,
		loading: () => <p>Loading...</p>,
	}
);

export default function Pdf({ filename }: { filename: string }): ReactElement {

	return (
		<>
			<div style={{ width: '100%', height: '100vh' }}>
				<PDFViewer width="100%" height="100%" showToolbar={false}>
					<Document>
						<CoverSheetOverwie filename={filename} />
						<Cv filename={filename} />
						<ApplicationLetterOverview filename={filename} />
						<Certification />
					</Document>
				</PDFViewer>
			</div>
		</>
	);
}
