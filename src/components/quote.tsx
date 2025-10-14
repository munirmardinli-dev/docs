import {
	StyledQuoteText,
	StyledQuoteAuthor,
	StyledQuoteSource,
	StyledQuoteSourceLink,
	HighlightedQuoteContainer,
	MinimalQuoteContainer,
	StyledQuoteIconEnd,
	StyledQuoteIconStart,
	StyledQuoteContainer,
} from '@/styles/quote';


/**
 * Eine flexible Quote-Komponente für MDX-Dokumentation
 *
 * @example
 * ```tsx
 * <Quote author="Albert Einstein" source="The Theory of Relativity">
 *   Die Phantasie ist wichtiger als das Wissen.
 * </Quote>
 * ```
 */
export default function Quote({
	children,
	author,
	source,
	sourceUrl,
	variant = 'default',
}: QuoteProps) {
	const renderQuoteContent = () => (
		<>
			<div style={{ display: 'flex', alignItems: 'flex-start' }}>
				<StyledQuoteText variant="body1" style={{ flex: 1 }}>
					{children}
				</StyledQuoteText>
				<StyledQuoteIconStart />
				<StyledQuoteIconEnd />
			</div>
			{(author || source) && (
				<div style={{ textAlign: 'right', marginTop: '16px' }}>
					{author && (
						<StyledQuoteAuthor variant="body2">{author}</StyledQuoteAuthor>
					)}
					{source && sourceUrl ? (
						<StyledQuoteSourceLink
							href={sourceUrl}
							target="_blank"
							rel="noopener noreferrer"
							variant="caption"
						>
							{source}
						</StyledQuoteSourceLink>
					) : source ? (
						<StyledQuoteSource variant="caption">{source}</StyledQuoteSource>
					) : null}
				</div>
			)}
		</>
	);

	switch (variant) {
		case 'highlighted':
			return (
				<HighlightedQuoteContainer elevation={0}>
					{renderQuoteContent()}
				</HighlightedQuoteContainer>
			);

		case 'minimal':
			return (
				<MinimalQuoteContainer>{renderQuoteContent()}</MinimalQuoteContainer>
			);

		default:
			return (
				<StyledQuoteContainer elevation={1}>
					{renderQuoteContent()}
				</StyledQuoteContainer>
			);
	}
}
