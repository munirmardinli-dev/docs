export default function getEnv() {
	return {
		NEXT_PUBLIC_UI_URL: process.env.NEXT_PUBLIC_UI_URL!,
		NEXT_PUBLIC_HEADER_TITEL: process.env.NEXT_PUBLIC_HEADER_TITEL || 'Docs',
		NEXT_PUBLIC_GIT_REPO_URL: process.env.NEXT_PUBLIC_GIT_REPO_URL || 'https://github.com/munir-mardinli/docs',
	};
}
