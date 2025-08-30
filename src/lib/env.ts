export default function getEnv<T extends string>() {
	return {
		NODE_ENV: (process.env.NODE_ENV || 'development') as T,
		NEXT_PUBLIC_UI_URL: (process.env.NEXT_PUBLIC_UI_URL!) as T,
		NEXT_PUBLIC_HEADER_TITEL: (process.env.NEXT_PUBLIC_HEADER_TITEL ||
			'Docs') as T,
		NEXT_PUBLIC_GIT_REPO_URL: (process.env.NEXT_PUBLIC_GIT_REPO_URL ||
			'https://github.com/munir-mardinli/docs') as T,
	};
}
