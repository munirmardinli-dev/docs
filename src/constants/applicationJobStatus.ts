export const ApplicationJobStatusEnum = {
	pending: 'pending',
	responded: 'responded',
	rejected: 'rejected',
	accepted: 'accepted',
} as const;

export type ApplicationJobStatusEnumType = typeof ApplicationJobStatusEnum[keyof typeof ApplicationJobStatusEnum];
